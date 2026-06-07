export type Locale = 'en' | 'vi' | 'es' | 'pt' | 'tr' | 'id' | 'ru' | 'zh';

type LocalizedText = Record<Locale, string>;

type Post = {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  date: string;
  contentHtml: LocalizedText;
};

const supportedLocales: Locale[] = ['en', 'vi', 'es', 'pt', 'tr', 'id', 'ru', 'zh'];

const posts: Post[] = [
  {
    slug: 'gate-io-review',
    title: {
      en: 'Gate.io Review 2026: Is it Legit and Safe?',
      vi: 'Đánh giá Gate.io 2026: Có uy tín và an toàn không?',
      es: 'Reseña de Gate.io 2026: ¿Es legítimo y seguro?',
      pt: 'Análise da Gate.io 2026: É confiável e segura?',
      tr: 'Gate.io İncelemesi 2026: Güvenilir ve Yasal mı?',
      id: 'Review Gate.io 2026: Apakah Sah dan Aman?',
      ru: 'Обзор Gate.io 2026: Надежно и безопасно?',
      zh: 'Gate.io 评测 2026：靠谱吗？安全吗？'
    },
    excerpt: {
      en: 'A comprehensive review of Gate.io exchange features, fees, security, and user experience in 2026.',
      vi: 'Đánh giá toàn diện về các tính năng, phí, bảo mật và trải nghiệm người dùng của Gate.io trong năm 2026.',
      es: 'Un análisis completo de las características, tarifas, seguridad y experiencia del usuario de Gate.io en 2026.',
      pt: 'Uma análise abrangente dos recursos, taxas, segurança e experiência do usuário da Gate.io em 2026.',
      tr: "2026'da Gate.io özelliklerinin, ücretlerinin, güvenliğinin ve kullanıcı deneyiminin kapsamlı bir incelemesi.",
      id: 'Ulasan komprehensif tentang fitur, biaya, keamanan, dan pengalaman pengguna Gate.io pada tahun 2026.',
      ru: 'Комплексный обзор функций, комиссий, безопасности и пользовательского опыта Gate.io в 2026 году.',
      zh: '全面解析 Gate.io 在 2026 年的功能、费率、安全性与用户体验。'
    },
    date: '2026-03-12',
    contentHtml: {
      en: `<h2>Introduction</h2><p>Gate.io is one of the oldest cryptocurrency exchanges, established in 2013. In 2026, it remains a top choice for altcoin traders.</p><h2>Key Features</h2><ul><li>Over 1,400 cryptocurrencies supported</li><li>Low trading fees</li><li>Advanced trading tools including copy trading and bots</li></ul><h2>Security</h2><p>Gate.io employs rigorous security measures, including cold storage and 2FA.</p><h2>Conclusion</h2><p>Gate.io is a legitimate and safe platform for experienced traders looking for a wide variety of assets.</p>`,
      vi: `<h2>Giới thiệu</h2><p>Gate.io là một trong những sàn giao dịch tiền mã hóa lâu đời nhất, được thành lập vào năm 2013. Đến năm 2026, đây vẫn là lựa chọn hàng đầu cho các nhà giao dịch altcoin.</p><h2>Các tính năng chính</h2><ul><li>Hỗ trợ hơn 1.400 loại tiền mã hóa</li><li>Phí giao dịch thấp</li><li>Công cụ giao dịch tiên tiến bao gồm copy trading và bot</li></ul><h2>Bảo mật</h2><p>Gate.io áp dụng các biện pháp bảo mật nghiêm ngặt, bao gồm lưu trữ lạnh và xác thực 2FA.</p><h2>Kết luận</h2><p>Gate.io là một nền tảng hợp pháp và an toàn cho các nhà giao dịch có kinh nghiệm đang tìm kiếm sự đa dạng về tài sản.</p>`,
      es: `<h2>Introducción</h2><p>Gate.io es uno de los intercambios de criptomonedas más antiguos, establecido en 2013. En 2026, sigue siendo una opción principal para los traders de altcoins.</p><h2>Características Clave</h2><ul><li>Más de 1,400 criptomonedas soportadas</li><li>Bajas tarifas de trading</li><li>Herramientas de trading avanzadas incluyendo copy trading y bots</li></ul><h2>Seguridad</h2><p>Gate.io emplea medidas de seguridad rigurosas, incluyendo almacenamiento en frío y 2FA.</p><h2>Conclusión</h2><p>Gate.io es una plataforma legítima y segura para traders experimentados que buscan una amplia variedad de activos.</p>`,
      pt: `<h2>Introdução</h2><p>A Gate.io é uma das exchanges de criptomoedas mais antigas, fundada em 2013. Em 2026, continua sendo uma das principais escolhas para traders de altcoins.</p><h2>Principais Recursos</h2><ul><li>Mais de 1.400 criptomoedas suportadas</li><li>Taxas de negociação baixas</li><li>Ferramentas avançadas de negociação, incluindo copy trading e bots</li></ul><h2>Segurança</h2><p>A Gate.io emprega medidas de segurança rigorosas, incluindo armazenamento a frio e autenticação de dois fatores (2FA).</p><h2>Conclusão</h2><p>A Gate.io é uma plataforma legítima e segura para traders experientes que buscam uma grande variedade de ativos.</p>`,
      tr: `<h2>Giriş</h2><p>Gate.io, 2013 yılında kurulan en eski kripto para borsalarından biridir. 2026'da altcoin yatırımcıları için en iyi seçeneklerden biri olmaya devam ediyor.</p><h2>Temel Özellikler</h2><ul><li>1.400'den fazla kripto para birimi desteği</li><li>Düşük işlem ücretleri</li><li>Kopyalama ticareti ve botlar dahil gelişmiş işlem araçları</li></ul><h2>Güvenlik</h2><p>Gate.io, soğuk depolama ve iki faktörlü kimlik doğrulama (2FA) dahil olmak üzere sıkı güvenlik önlemleri uygular.</p><h2>Sonuç</h2><p>Gate.io, çok çeşitli varlıklar arayan deneyimli yatırımcılar için yasal ve güvenli bir platformdur.</p>`,
      id: `<h2>Pengantar</h2><p>Gate.io adalah salah satu bursa kripto tertua, didirikan pada tahun 2013. Pada tahun 2026, ini tetap menjadi pilihan utama bagi pedagang altcoin.</p><h2>Fitur Utama</h2><ul><li>Lebih dari 1.400 mata uang kripto didukung</li><li>Biaya perdagangan rendah</li><li>Alat perdagangan canggih termasuk copy trading dan bot</li></ul><h2>Keamanan</h2><p>Gate.io menerapkan langkah-langkah keamanan yang ketat, termasuk penyimpanan dingin dan autentikasi dua faktor (2FA).</p><h2>Kesimpulan</h2><p>Gate.io adalah platform yang sah dan aman bagi pedagang berpengalaman yang mencari berbagai macam aset.</p>`,
      ru: `<h2>Введение</h2><p>Gate.io — одна из старейших криптовалютных бирж, основанная в 2013 году. В 2026 году она остается одним из лучших выборов для трейдеров альткоинов.</p><h2>Ключевые особенности</h2><ul><li>Поддержка более 1400 криптовалют</li><li>Низкие торговые комиссии</li><li>Продвинутые торговые инструменты, включая копи-трейдинг и ботов</li></ul><h2>Безопасность</h2><p>Gate.io применяет строгие меры безопасности, включая холодное хранение и двухфакторную аутентификацию (2FA).</p><h2>Заключение</h2><p>Gate.io — это легальная и безопасная платформа для опытных трейдеров, ищущих широкий выбор активов.</p>`,
      zh: `<h2>简介</h2><p>Gate.io 成立于 2013 年，是历史较久的加密货币交易所之一。到 2026 年，它仍然是许多山寨币交易用户的热门选择。</p><h2>核心特点</h2><ul><li>支持超过 1,400 种加密资产</li><li>交易费率具竞争力</li><li>提供跟单、交易机器人等进阶工具</li></ul><h2>安全性</h2><p>Gate.io 采用较为严格的安全措施，包括冷存储与 2FA 等。</p><h2>结论</h2><p>对于希望获取更丰富币种选择的进阶用户来说，Gate.io 通常是一个可考虑的平台；在注册与交易前建议核对官方规则与地区限制。</p>`
    }
  },
  {
    slug: 'gate-io-fees-explained',
    title: {
      en: 'Gate.io Fees Explained: Spot, Futures & Withdrawal',
      vi: 'Giải thích phí Gate.io: Spot, Futures & Rút tiền',
      es: 'Tarifas de Gate.io Explicadas: Spot, Futuros y Retiro',
      pt: 'Taxas da Gate.io Explicadas: Spot, Futuros e Saque',
      tr: 'Gate.io Ücretleri Açıklandı: Spot, Vadeli İşlemler ve Çekim',
      id: 'Biaya Gate.io Dijelaskan: Spot, Futures & Penarikan',
      ru: 'Комиссии Gate.io: Спот, Фьючерсы и Вывод',
      zh: 'Gate.io 手续费详解：现货、合约与提现'
    },
    excerpt: {
      en: 'Detailed breakdown of Gate.io trading fees, VIP discounts, and how to save money on transactions.',
      vi: 'Chi tiết về phí giao dịch Gate.io, giảm giá VIP và cách tiết kiệm tiền khi giao dịch.',
      es: 'Desglose detallado de las tarifas de trading de Gate.io, descuentos VIP y cómo ahorrar dinero en transacciones.',
      pt: 'Detalhamento das taxas de negociação da Gate.io, descontos VIP e como economizar nas transações.',
      tr: 'Gate.io işlem ücretlerinin, VIP indirimlerinin ve işlemlerde nasıl tasarruf edileceğinin ayrıntılı dökümü.',
      id: 'Rincian biaya perdagangan Gate.io, diskon VIP, dan cara menghemat uang dalam transaksi.',
      ru: 'Подробный разбор торговых комиссий Gate.io, VIP-скидок и способов сэкономить на транзакциях.',
      zh: '拆解 Gate.io 交易费率、VIP 折扣与常见省费方法，帮助你在交易中降低成本。'
    },
    date: '2026-03-12',
    contentHtml: {
      en: `<h2>Trading Fees</h2><p>Gate.io offers a competitive fee structure starting at 0.1% for spot trading.</p><h2>VIP Discounts</h2><p>By holding GT tokens or increasing your trading volume, you can reduce fees significantly.</p><h2>Futures Fees</h2><p>Futures trading fees are even lower, with maker rebates available for high-volume traders.</p><h2>Withdrawal Fees</h2><p>Withdrawal fees vary by network congestion and the specific asset.</p>`,
      vi: `<h2>Phí giao dịch</h2><p>Gate.io cung cấp cấu trúc phí cạnh tranh bắt đầu từ 0.1% cho giao dịch giao ngay (spot).</p><h2>Giảm giá VIP</h2><p>Bằng cách nắm giữ token GT hoặc tăng khối lượng giao dịch, bạn có thể giảm phí đáng kể.</p><h2>Phí Futures</h2><p>Phí giao dịch hợp đồng tương lai thậm chí còn thấp hơn, với các khoản hoàn trả cho maker dành cho các nhà giao dịch khối lượng lớn.</p><h2>Phí rút tiền</h2><p>Phí rút tiền thay đổi tùy thuộc vào tình trạng tắc nghẽn mạng và loại tài sản cụ thể.</p>`,
      es: `<h2>Tarifas de Trading</h2><p>Gate.io ofrece una estructura de tarifas competitiva comenzando en 0.1% para trading spot.</p><h2>Descontos VIP</h2><p>Al mantener tokens GT o aumentar tu volumen de trading, puedes reducir las tarifas significativamente.</p><h2>Tarifas de Futuros</h2><p>Las tarifas de trading de futuros son aún más bajas, con reembolsos para creadores de mercado disponibles para traders de alto volumen.</p><h2>Tarifas de Retiro</h2><p>Las tarifas de retiro varían según la congestión de la red y el activo específico.</p>`,
      pt: `<h2>Taxas de Negociação</h2><p>A Gate.io oferece uma estrutura de taxas competitiva começando em 0,1% para negociação à vista (spot).</p><h2>Descontos VIP</h2><p>Ao manter tokens GT ou aumentar seu volume de negociação, você pode reduzir as taxas significativamente.</p><h2>Taxas de Futuros</h2><p>As taxas de negociação de futuros são ainda mais baixas, com reembolsos para formadores de mercado (makers) disponíveis para traders de alto volume.</p><h2>Taxas de Saque</h2><p>As taxas de saque variam de acordo com o congestionamento da rede e o ativo específico.</p>`,
      tr: `<h2>İşlem Ücretleri</h2><p>Gate.io, spot işlemler için %0,1'den başlayan rekabetçi bir ücret yapısı sunar.</p><h2>VIP İndirimleri</h2><p>GT tokenlerini tutarak veya işlem hacminizi artırarak ücretleri önemli ölçüde azaltabilirsiniz.</p><h2>Vadeli İşlem Ücretleri</h2><p>Vadeli işlem ücretleri daha da düşüktür ve yüksek hacimli yatırımcılar için piyasa yapıcı iadeleri mevcuttur.</p><h2>Çekim Ücretleri</h2><p>Çekim ücretleri, ağ yoğunluğuna ve belirli varlığa bağlı olarak değişir.</p>`,
      id: `<h2>Biaya Perdagangan</h2><p>Gate.io menawarkan struktur biaya kompetitif mulai dari 0,1% untuk perdagangan spot.</p><h2>Diskon VIP</h2><p>Dengan memegang token GT atau meningkatkan volume perdagangan, Anda dapat mengurangi biaya secara signifikan.</p><h2>Biaya Futures</h2><p>Biaya perdagangan berjangka bahkan lebih rendah, dengan rabat pembuat pasar tersedia bagi pedagang volume tinggi.</p><h2>Biaya Penarikan</h2><p>Biaya penarikan bervariasi tergantung pada kemacetan jaringan dan aset tertentu.</p>`,
      ru: `<h2>Торговые комиссии</h2><p>Gate.io предлагает конкурентную структуру комиссий, начиная с 0,1% для спотовой торговли.</p><h2>VIP-скидки</h2><p>Удерживая токены GT или увеличивая объем торгов, вы можете значительно снизить комиссии.</p><h2>Комиссии на фьючерсах</h2><p>Комиссии за торговлю фьючерсами еще ниже, с рибейтами для мейкеров, доступными для трейдеров с большим объемом.</p><h2>Комиссии за вывод</h2><p>Комиссии за вывод средств варьируются в зависимости от загруженности сети и конкретного актива.</p>`,
      zh: `<h2>交易手续费</h2><p>Gate.io 的费率体系通常从现货 0.1% 起步（具体以你的费率等级为准）。</p><h2>VIP 折扣</h2><p>通过持有平台币 GT 或提升交易量，你可能获得更低费率。</p><h2>合约手续费</h2><p>合约交易手续费通常更低；高等级用户可能享受更优费率或返佣（以官方规则为准）。</p><h2>提现手续费</h2><p>提现费用会随网络拥堵情况与不同币种/链而变化，建议提现前在官方页面确认。</p>`
    }
  },
  {
    slug: 'gate-io-startup-guide',
    title: {
      en: 'Gate.io Startup Guide: How to Participate in IEOs',
      vi: 'Hướng dẫn Gate.io Startup: Cách tham gia IEO',
      es: 'Guía de Gate.io Startup: Cómo Participar en IEOs',
      pt: 'Guia Gate.io Startup: Como Participar de IEOs',
      tr: "Gate.io Startup Rehberi: IEO'lara Nasıl Katılınır",
      id: 'Panduan Gate.io Startup: Cara Berpartisipasi dalam IEO',
      ru: 'Руководство по Gate.io Startup: Как участвовать в IEO',
      zh: 'Gate.io Startup 新手指南：如何参与 IEO'
    },
    excerpt: {
      en: 'Learn how to participate in Gate.io Startup projects and get early access to new tokens.',
      vi: 'Tìm hiểu cách tham gia các dự án Gate.io Startup và nhận quyền truy cập sớm vào các token mới.',
      es: 'Aprende a participar en proyectos de Gate.io Startup y obtén acceso anticipado a nuevos tokens.',
      pt: 'Saiba como participar dos projetos Gate.io Startup e obter acesso antecipado a novos tokens.',
      tr: 'Gate.io Startup projelerine nasıl katılacağınızı ve yeni tokenlere nasıl erken erişim sağlayacağınızı öğrenin.',
      id: 'Pelajari cara berpartisipasi dalam proyek Gate.io Startup dan dapatkan akses awal ke token baru.',
      ru: 'Узнайте, как участвовать в проектах Gate.io Startup и получить ранний доступ к новым токенам.',
      zh: '了解如何参与 Gate.io Startup 项目，在上线前提前获取新币认购/空投机会。'
    },
    date: '2026-03-12',
    contentHtml: {
      en: `<h2>What is Gate.io Startup?</h2><p>Gate.io Startup is a platform for launching new blockchain projects. Users can subscribe to receive airdrops or purchase tokens at a discount.</p><h2>How to Participate</h2><ol><li>Register and verify your account</li><li>Hold at least 10 USDT in assets</li><li>Sign the purchase agreement</li><li>Place your order during the subscription period</li></ol><h2>Benefits</h2><p>Participating in Startups can yield significant returns if the project performs well after listing.</p>`,
      vi: `<h2>Gate.io Startup là gì?</h2><p>Gate.io Startup là nền tảng ra mắt các dự án blockchain mới. Người dùng có thể đăng ký để nhận airdrop hoặc mua token với giá ưu đãi.</p><h2>Cách tham gia</h2><ol><li>Đăng ký và xác minh tài khoản của bạn</li><li>Giữ ít nhất 10 USDT tài sản</li><li>Ký thỏa thuận mua</li><li>Đặt lệnh trong thời gian đăng ký</li></ol><h2>Lợi ích</h2><p>Tham gia Startup có thể mang lại lợi nhuận đáng kể nếu dự án hoạt động tốt sau khi niêm yết.</p>`,
      es: `<h2>¿Qué es Gate.io Startup?</h2><p>Gate.io Startup es una plataforma para lanzar nuevos proyectos blockchain. Los usuarios pueden suscribirse para recibir airdrops o comprar tokens con descuento.</p><h2>Cómo Participar</h2><ol><li>Regístrate y verifica tu cuenta</li><li>Mantén al menos 10 USDT en activos</li><li>Firma el acuerdo de compra</li><li>Realiza tu pedido durante el período de suscripción</li></ol><h2>Beneficios</h2><p>Participar en Startups puede generar rendimientos significativos si el proyecto tiene un buen desempeño después del listado.</p>`,
      pt: `<h2>O que é o Gate.io Startup?</h2><p>O Gate.io Startup é uma plataforma para lançar novos projetos de blockchain. Os usuários podem se inscrever para receber airdrops ou comprar tokens com desconto.</p><h2>Como Participar</h2><ol><li>Cadastre-se e verifique sua conta</li><li>Mantenha pelo menos 10 USDT em ativos</li><li>Assine o acordo de compra</li><li>Faça seu pedido durante o período de assinatura</li></ol><h2>Benefícios</h2><p>Participar de Startups pode gerar retornos significativos se o projeto tiver um bom desempenho após a listagem.</p>`,
      tr: `<h2>Gate.io Startup Nedir?</h2><p>Gate.io Startup, yeni blok zinciri projelerini başlatmak için bir platformdur. Kullanıcılar airdrop almak veya indirimli token satın almak için abone olabilirler.</p><h2>Nasıl Katılınır</h2><ol><li>Hesabınızı kaydedin ve doğrulayın</li><li>En az 10 USDT değerinde varlık tutun</li><li>Satın alma sözleşmesini imzalayın</li><li>Abonelik süresi boyunca siparişinizi verin</li></ol><h2>Faydalar</h2><p>Startup'lara katılmak, proje listelemeden sonra iyi performans gösterirse önemli getiriler sağlayabilir.</p>`,
      id: `<h2>Apa itu Gate.io Startup?</h2><p>Gate.io Startup adalah platform untuk meluncurkan proyek blockchain baru. Pengguna dapat berlangganan untuk menerima airdrop atau membeli token dengan harga diskon.</p><h2>Cara Berpartisipasi</h2><ol><li>Daftar dan verifikasi akun Anda</li><li>Simpan setidaknya 10 USDT aset</li><li>Tanda tangani perjanjian pembelian</li><li>Lakukan pemesanan selama periode berlangganan</li></ol><h2>Manfaat</h2><p>Berpartisipasi dalam Startup dapat menghasilkan keuntungan yang signifikan jika proyek berkinerja baik setelah listing.</p>`,
      ru: `<h2>Что такое Gate.io Startup?</h2><p>Gate.io Startup — это платформа для запуска новых блокчейн-проектов. Пользователи могут подписаться на получение аирдропов или покупку токенов со скидкой.</p><h2>Как участвовать</h2><ol><li>Зарегистрируйтесь и верифицируйте свой аккаунт</li><li>Держите на счету активы на сумму не менее 10 USDT</li><li>Подпишите соглашение о покупке</li><li>Разместите ордер в период подписки</li></ol><h2>Преимущества</h2><p>Участие в Startup может принести значительную прибыль, если проект покажет хорошие результаты после листинга.</p>`,
      zh: `<h2>什么是 Gate.io Startup？</h2><p>Gate.io Startup 是新项目上线前的认购/活动平台。用户可以通过参与活动来获得空投或以优惠价格认购新代币（具体规则以项目活动为准）。</p><h2>如何参与</h2><ol><li>注册并完成账号验证</li><li>账户内保持一定资产（例如不少于 10 USDT，具体以活动要求为准）</li><li>阅读并签署认购协议</li><li>在申购期间提交申购</li></ol><h2>注意事项</h2><p>参与 Startup 的收益并非保证，项目上线后表现也可能波动。建议在参与前仔细阅读活动规则与风险提示。</p>`
    }
  }
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  contentHtml: string;
}

export async function getPostData(locale: string, slug: string): Promise<BlogPost | null> {
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return null;
  }

  const currentLocale = supportedLocales.includes(locale as Locale) ? (locale as Locale) : 'en';

  return {
    slug,
    contentHtml: post.contentHtml[currentLocale],
    title: post.title[currentLocale],
    excerpt: post.excerpt[currentLocale],
    date: post.date,
  };
}

export function getAllPosts(locale: string): Omit<BlogPost, 'contentHtml'>[] {
  const currentLocale = supportedLocales.includes(locale as Locale) ? (locale as Locale) : 'en';

  return posts
    .map((post) => {
      return {
        slug: post.slug,
        title: post.title[currentLocale],
        excerpt: post.excerpt[currentLocale],
        date: post.date,
      };
    })
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
}
