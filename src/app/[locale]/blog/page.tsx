import {getTranslations} from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {Link} from '@/i18n/routing';
import {getAllPosts} from '@/lib/blog';

export const runtime = 'edge';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Blog'});
  const baseUrl = 'https://gateioreferralcode.com';
 
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages: {
        en: `${baseUrl}/en/blog`,
        vi: `${baseUrl}/vi/blog`,
        es: `${baseUrl}/es/blog`,
        pt: `${baseUrl}/pt/blog`,
        tr: `${baseUrl}/tr/blog`,
        id: `${baseUrl}/id/blog`,
        ru: `${baseUrl}/ru/blog`,
      },
    },
  };
}

export default async function BlogIndex({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Blog'});
  
  const posts = getAllPosts(locale);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-center">{t('title')}</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">{t('description')}</p>
        
        <div className="grid gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 transition hover:shadow-lg">
              <h2 className="text-2xl font-bold mb-3">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition">
                  {post.title}
                </Link>
              </h2>
              <div className="text-sm text-gray-500 mb-2">{post.date}</div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              <Link href={`/blog/${post.slug}`} className="text-blue-600 font-semibold hover:underline">
                {t('read_more')} →
              </Link>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
