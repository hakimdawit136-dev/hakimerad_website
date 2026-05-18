import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const posts = await query('SELECT * FROM blog_posts ORDER BY date DESC') as any[];
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { slug, title, excerpt, category, author, reading_minutes, image, image_alt, content } = await request.json();

    await query(
      'INSERT INTO blog_posts (slug, title, excerpt, category, author, date, reading_minutes, image, image_alt, content) VALUES (?, ?, ?, ?, ?, CURDATE(), ?, ?, ?, ?)',
      [slug, title, excerpt, category, author, reading_minutes, image, image_alt, content]
    );

    return NextResponse.json({ message: 'Post created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
