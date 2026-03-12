import {getTranslations} from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {notFound} from 'next/navigation';
import {getPostData} from '@/lib/blog';

export const runtime = 'edge';

export async function generateMetadata({params}: {params: Promise<{locale: string, slug: string}>}) {
  const {locale, slug} = await params;
  const post = await getPostData(locale, slug);
  
  if (!post) return {};

  const baseUrl = 'https://gateioreferralcode.com';

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${slug}`,
      languages: {
        en: `${baseUrl}/en/blog/${slug}`,
        vi: `${baseUrl}/vi/blog/${slug}`,
        es: `${baseUrl}/es/blog/${slug}`,
        pt: `${baseUrl}/pt/blog/${slug}`,
        tr: `${baseUrl}/tr/blog/${slug}`,
        id: `${baseUrl}/id/blog/${slug}`,
        ru: `${baseUrl}/ru/blog/${slug}`,
      },
    },
  };
}

export default async function BlogPost({params}: {params: Promise<{locale: string, slug: string}>}) {
  const {locale, slug} = await params;
  const post = await getPostData(locale, slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <article className="prose dark:prose-invert prose-blue max-w-none">
          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
          <div className="text-gray-500 mb-8">{post.date}</div>
          <div 
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}
