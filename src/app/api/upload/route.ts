import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const path = formData.get('path') as string

    if (!file) {
      return NextResponse.json(
        { error: '没有找到文件' },
        { status: 400 }
      )
    }

    // 获取文件的二进制数据
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 确保目标目录存在
    const filePath = join(process.cwd(), 'public', path)
    await writeFile(filePath, buffer)

    return NextResponse.json({ success: true, path })
  } catch (error) {
    console.error('文件上传失败:', error)
    return NextResponse.json(
      { error: '文件上传失败' },
      { status: 500 }
    )
  }
} 