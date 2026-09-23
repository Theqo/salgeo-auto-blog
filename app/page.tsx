import { createClient } from '@supabase/supabase-js';

export const revalidate = 60;

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

export default async function HomePage() {
    const { data: posts } = await supabase
      .from('posts')
      .select('*, products(*)')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

  return (
        <main className="max-w-4xl mx-auto px-4 py-12 font-sans">
              <header className="mb-12 text-center">
                      <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                                매일 오전 9시 업데이트
                      </span>span>
                      <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                                쇼츠 특가 상품 큐이션 블로그
                      </h1>h1>
                      <p className="text-gray-500 mt-2 text-base">
                                유튜브 쇼츠에서 화제가 된 알짜배기 특가 상품을 엄선하여 안내해 드립니다.
                      </p>p>
              </header>header>
        
          {(!posts || posts.length === 0) ? (
                  <div className="text-center py-20 border rounded-2xl bg-gray-50">
                            <p className="text-gray-500 text-lg font-medium">아직 발행된 포스팅이 없습니다.</p>p>
                            <p className="text-gray-400 text-sm mt-1">매일 오전 9시 Vercel Cron이 자동으로 새 글을 수집하여 작성합니다.</p>p>
                  </div>div>
                ) : (
                  <div className="space-y-12">
                    {posts.map((post) => (
                                <article key={post.id} className="border rounded-2xl p-6 sm:p-8 bg-white shadow-sm hover:shadow-md transition">
                                              <header className="mb-4">
                                                {post.products && (
                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <span className="bg-red-50 text-red-600 text-xs font-extrabold px-2.5 py-1 rounded">
                                                                          {post.products.discount_rate}% OFF
                                                                        </span>span>
                                                                        <span className="text-xs text-gray-400 font-mono">{post.products.id}</span>span>
                                                    </div>div>
                                                              )}
                                                              <h2 className="text-2xl font-extrabold text-gray-900 leading-snug">{post.title}</h2>h2>
                                                              <p className="text-xs text-gray-400 mt-1">
                                                                                게시일: {new Date(post.published_at).toLocaleDateString('ko-KR')}
                                                              </p>p>
                                              </header>header>
                                
                                  {post.products && (
                                                  <div className="bg-orange-50/60 border border-orange-100 rounded-xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                                    <div>
                                                                                        <h3 className="font-bold text-gray-900 text-base">{post.products.name}</h3>h3>
                                                                                        <p className="text-xl font-black text-orange-600 mt-1">
                                                                                          {post.products.sale_price.toLocaleString()}원
                                                                                                              <span className="text-sm font-normal line-through text-gray-400 ml-2">
                                                                                                                {post.products.original_price.toLocaleString()}원
                                                                                                                </span>span>
                                                                                          </p>p>
                                                                    </div>div>
                                                                    <div className="flex gap-2 w-full sm:w-auto">
                                                                      {post.products.shortsUrl && (
                                                                          <a
                                                                                                    href={post.products.shortsUrl}
                                                                                                    target="_blank"
                                                                                                    rel="noreferrer"
                                                                                                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition text-center"
                                                                                                  >
                                                                                                  쇼츠 영상 ↗
                                                                          </a>a>
                                                                                        )}
                                                                                        <a
                                                                                                                href={post.products.purchase_url}
                                                                                                                target="_blank"
                                                                                                                rel="noreferrer nofollow"
                                                                                                                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-lg transition text-center shadow-sm"
                                                                                                              >
                                                                                                              최저가 사러 가기 ↗
                                                                                          </a>a>
                                                                    </div>div>
                                                  </div>div>
                                              )}
                                
                                              <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base border-b pb-6 mb-4">
                                                {post.content}
                                              </div>div>
                                
                                              <footer className="text-xs text-gray-400">
                                                              ✱ 이 포스팅은 스쇼핑 쉐어링크 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
                                              </footer>footer>
                                </article>article>
                              ))}
                  </div>div>
              )}
        </main>main>
      );
}</main>
