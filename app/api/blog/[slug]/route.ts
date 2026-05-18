import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const resolvedParams = await params;
    const posts = await query('SELECT * FROM blog_posts WHERE slug = ?', [resolvedParams.slug]) as any[];
    
    if (posts.length === 0) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json(posts[0]);
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const session = await auth();
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const { title, excerpt, category, author, reading_minutes, image, image_alt, content } = await request.json();

    await query(
      'UPDATE blog_posts SET title = ?, excerpt = ?, category = ?, author = ?, reading_minutes = ?, image = ?, image_alt = ?, content = ? WHERE slug = ?',
      [title, excerpt, category, author, reading_minutes, image, image_alt, content, resolvedParams.slug]
    );

    return NextResponse.json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Update post error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const session = await auth();
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    await query('DELETE FROM blog_posts WHERE slug = ?', [resolvedParams.slug]);

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
