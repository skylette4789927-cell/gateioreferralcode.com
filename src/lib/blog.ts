import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  contentHtml: string;
}

export async function getPostData(locale: string, slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, locale, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const contentHtml = await marked.parse(matterResult.content);

  return {
    slug,
    contentHtml,
    title: matterResult.data.title,
    excerpt: matterResult.data.excerpt,
    date: matterResult.data.date,
  };
}

export function getAllPosts(locale: string): Omit<BlogPost, 'contentHtml'>[] {
  const localeDirectory = path.join(postsDirectory, locale);
  
  if (!fs.existsSync(localeDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(localeDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(localeDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title,
      excerpt: matterResult.data.excerpt,
      date: matterResult.data.date,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
