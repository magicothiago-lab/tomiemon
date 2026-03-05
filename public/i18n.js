/* ============================
   UNIFIED TRANSLATION SYSTEM
============================ */

const translations = {
    en: {
        // Navigation
        home: "Home",
        login: "Login",
        howItWorks: "How It Works",
        calculator: "Calculator",
        portfolio: "Portfolio",

        // Home Page - Hero
        heroTitle: "Build Your Financial Future",
        heroSubtitle: "Elite investment strategies designed for discerning investors seeking exceptional returns and wealth preservation.",
        getStarted: "Get Started",

        // How It Works - Hero
        heroTitle2: "How It Works",
        heroSubtitle2: "Your journey to financial growth starts here. Discover our simple, transparent process designed to help you build wealth with confidence.",

        // Home Page - Stats
        stat1: "Assets Under Management",
        stat2: "Returns up-to",
        stat3: "Satisfied Members",
        stat4: "Years of Excellence",

        // Home Page - Features
        sectionTitle: "Why Choose Wealth Club",
        sectionSubtitle: "Our comprehensive approach to wealth management combines sophisticated strategies with personalized service.",
        feature1Title: "Strategic Investment",
        feature1Text: "Our expert team employs sophisticated strategies across diverse asset classes, from equities and fixed income to alternative investments, ensuring optimal portfolio diversification and risk-adjusted returns.",
        feature2Title: "Wealth Preservation",
        feature2Text: "Protecting your capital is paramount. We implement robust risk management frameworks and hedging strategies to safeguard your wealth against market volatility while positioning for growth opportunities.",
        feature3Title: "Personalized Service",
        feature3Text: "Every member receives dedicated attention from our wealth advisors. We craft bespoke investment solutions tailored to your unique financial goals, risk tolerance, and time horizon.",
        feature4Title: "Long-Term Vision",
        feature4Text: "We focus on sustainable wealth creation through disciplined, long-term investment approaches. Our strategies are designed to compound returns steadily while navigating market cycles effectively.",
        feature5Title: "Bank-Level Security",
        feature5Text: "Your assets and personal information are protected by institutional-grade security measures, including multi-factor authentication, encryption, and partnership with top-tier custodians.",
        feature6Title: "Transparent Reporting",
        feature6Text: "Access comprehensive performance reports, detailed portfolio analytics, and real-time account information through our secure member portal. Full transparency is our commitment to you.",

        // How it Works - Features
        sectionTitle2: "Four Simple Steps to Success",
        sectionSubtitle2: "We've streamlined the investment process to make wealth building accessible and straightforward.",

        // Home Page - CTA
        ctaTitle: "Ready to Elevate Your Investment Strategy?",
        ctaSubtitle: "Join an exclusive community of sophisticated investors and gain access to institutional-quality investment opportunities.",
        ctaButton: "Access Member Portal",

        // How It Works Page
        step1Title: "Create Your Account",
        step1Text: "Sign up in minutes with our secure registration process. Provide your basic information and complete identity verification to ensure account security.",
        step1Feature1: "Quick 5-minute setup",
        step1Feature2: "Bank-level security protocols",
        step1Feature3: "Secure identity verification",

        step2Title: "Fund Your Account",
        step2Text: "Make your initial deposit through our secure payment gateway. Choose from multiple funding options including bank transfer and cryptocurrency.",
        step2Feature1: "Multiple payment methods",
        step2Feature2: "Encrypted transactions",
        step2Feature3: "Instant confirmation",

        step3Title: "We Invest For You",
        step3Text: "Our expert team allocates your capital across a diversified portfolio of high-performing assets. Sit back while we work to grow your wealth.",
        step3Feature1: "Professional portfolio management",
        step3Feature2: "Diversified asset allocation",
        step3Feature3: "Risk-adjusted strategies",

        step4Title: "Watch Your Wealth Grow",
        step4Text: "Monitor your returns through our intuitive dashboard. Track performance, view detailed analytics, and withdraw profits whenever you need.",
        step4Feature1: "Real-time performance tracking",
        step4Feature2: "Transparent reporting",
        step4Feature3: "Flexible withdrawal options",

        plansTitle: "Choose Your Investment Plan",
        plansSubtitle: "Select a plan that aligns with your financial goals and risk tolerance.",
        annualReturns: "Annual Returns",

        faqTitle: "Frequently Asked Questions",
        faqSubtitle: "Everything you need to know about investing with Wealth Club.",

        faqQ1: "How do I get started?",
        faqA1: "Simply create an account, complete verification, fund your account, and choose your investment plan. Our team handles everything else.",
        faqQ2: "What is the minimum investment?",
        faqA2: "Our entry-level Growth Plan starts at just €10, making professional wealth management accessible to everyone.",
        faqQ3: "When can I withdraw my funds?",
        faqA3: "You can request withdrawals at any time. Processing typically takes 1-3 business days depending on your chosen method.",
        faqQ4: "Is my investment safe?",
        faqA4: "Yes. We use bank-level security, work with top-tier custodians, and implement comprehensive risk management strategies.",
        faqQ5: "What returns can I expect?",
        faqA5: "Returns vary by plan, ranging from 6-10% annually. Past performance doesn't guarantee future results, but we aim for consistent growth.",
        faqQ6: "Are there any fees?",
        faqA6: "We operate on a performance-based fee structure. Our success is directly tied to your returns, ensuring alignment of interests.",

        //portfolio
        portfolioTitle: "Portfolio Performance",
        portfolioSubtitle: "Track the performance of our loan portfolio and your investment returns",
        totalInvested: "Total Invested",
        activeLoans: "Active Loans",
        currentValue: "Current Value",
        totalReturn: "Total Return",
        performanceOverTime: "Performance Over Time",
        principalInvested: "Principal Invested",
        portfolioValue: "Portfolio Value",
        interestEarned: "Interest Earned",
        loanPortfolio: "Loan Portfolio",
        loanId: "Loan ID",
        startDate: "Start Date",
        principal: "Principal",
        interestRate: "Interest Rate",
        term: "Term",
        status: "Status",
        returnAmount: "Return"
    },

    pt: {
        // Navigation
        home: "Início",
        login: "Entrar",
        howItWorks: "Como Funciona",
        calculator: "Calculadora",
        portfolio: "Portfólio",

        // Home Page - Hero
        heroTitle: "Construa Seu Futuro Financeiro",
        heroSubtitle: "Estratégias de investimento de elite projetadas para investidores exigentes que buscam retornos excepcionais e preservação de patrimônio.",
        getStarted: "Começar",

        // How It Works - Hero
        heroTitle2: "Como funciona",
        heroSubtitle2: "Sua jornada rumo ao crescimento financeiro começa aqui. Descubra nosso processo simples e transparente, desenvolvido para ajudá-lo a construir patrimônio com confiança.",

        // Home Page - Stats
        stat1: "Ativos Sob Gestão",
        stat2: "Retornos de até",
        stat3: "Membros Satisfeitos",
        stat4: "Anos de Excelência",

        // Home Page - Features
        sectionTitle: "Por Que Escolher o Wealth Club",
        sectionSubtitle: "Nossa abordagem abrangente de gestão de patrimônio combina estratégias sofisticadas com serviço personalizado.",
        feature1Title: "Investimento Estratégico",
        feature1Text: "Nossa equipe especializada emprega estratégias sofisticadas em diversas classes de ativos, de ações e renda fixa a investimentos alternativos, garantindo diversificação ideal de portfólio e retornos ajustados ao risco.",
        feature2Title: "Preservação de Patrimônio",
        feature2Text: "Proteger seu capital é fundamental. Implementamos estruturas robustas de gestão de risco e estratégias de hedge para proteger seu patrimônio contra a volatilidade do mercado enquanto nos posicionamos para oportunidades de crescimento.",
        feature3Title: "Serviço Personalizado",
        feature3Text: "Cada membro recebe atenção dedicada de nossos consultores de patrimônio. Criamos soluções de investimento personalizadas adaptadas aos seus objetivos financeiros únicos, tolerância ao risco e horizonte de tempo.",
        feature4Title: "Visão de Longo Prazo",
        feature4Text: "Focamos na criação sustentável de riqueza através de abordagens disciplinadas de investimento de longo prazo. Nossas estratégias são projetadas para compor retornos de forma constante enquanto navegamos efetivamente pelos ciclos de mercado.",
        feature5Title: "Segurança de Nível Bancário",
        feature5Text: "Seus ativos e informações pessoais são protegidos por medidas de segurança de nível institucional, incluindo autenticação multifator, criptografia e parceria com custodiantes de primeira linha.",
        feature6Title: "Relatórios Transparentes",
        feature6Text: "Acesse relatórios abrangentes de desempenho, análises detalhadas de portfólio e informações de conta em tempo real através de nosso portal seguro para membros. Transparência total é nosso compromisso com você.",

        // How it Works - Features
        sectionTitle2: "Quatro passos simples para o sucesso",
        sectionSubtitle2: "Simplificamos o processo de investimento para tornar a construção de riqueza acessível e descomplicada.",

        // Home Page - CTA
        ctaTitle: "Pronto para Elevar Sua Estratégia de Investimento?",
        ctaSubtitle: "Junte-se a uma comunidade exclusiva de investidores sofisticados e ganhe acesso a oportunidades de investimento de qualidade institucional.",
        ctaButton: "Acessar Portal do Membro",

        // How It Works Page
        step1Title: "Crie Sua Conta",
        step1Text: "Cadastre-se em minutos com nosso processo de registro seguro. Forneça suas informações básicas e complete a verificação de identidade para garantir a segurança da conta.",
        step1Feature1: "Configuração rápida de 5 minutos",
        step1Feature2: "Protocolos de segurança de nível bancário",
        step1Feature3: "Verificação de identidade segura",

        step2Title: "Financie Sua Conta",
        step2Text: "Faça seu depósito inicial através de nosso gateway de pagamento seguro. Escolha entre múltiplas opções de financiamento incluindo transferência bancária e criptomoeda.",
        step2Feature1: "Múltiplos métodos de pagamento",
        step2Feature2: "Transações criptografadas",
        step2Feature3: "Confirmação instantânea",

        step3Title: "Nós Investimos Para Você",
        step3Text: "Nossa equipe especializada aloca seu capital em um portfólio diversificado de ativos de alto desempenho. Relaxe enquanto trabalhamos para aumentar sua riqueza.",
        step3Feature1: "Gestão profissional de portfólio",
        step3Feature2: "Alocação diversificada de ativos",
        step3Feature3: "Estratégias ajustadas ao risco",

        step4Title: "Veja Sua Riqueza Crescer",
        step4Text: "Monitore seus retornos através de nosso painel intuitivo. Acompanhe o desempenho, visualize análises detalhadas e retire lucros sempre que precisar.",
        step4Feature1: "Rastreamento de desempenho em tempo real",
        step4Feature2: "Relatórios transparentes",
        step4Feature3: "Opções flexíveis de retirada",

        plansTitle: "Escolha Seu Plano de Investimento",
        plansSubtitle: "Selecione um plano que se alinha com seus objetivos financeiros e tolerância ao risco.",
        annualReturns: "Retornos Anuais",

        faqTitle: "Perguntas Frequentes",
        faqSubtitle: "Tudo o que você precisa saber sobre investir com o Wealth Club.",

        faqQ1: "Como começo?",
        faqA1: "Basta criar uma conta, concluir a verificação, depositar fundos e escolher seu plano de investimento. Nossa equipe cuida do restante.",
        faqQ2: "Qual é o investimento mínimo?",
        faqA2: "Nosso plano inicial Growth começa em apenas €10, tornando a gestão profissional acessível a todos.",
        faqQ3: "Quando posso sacar meus fundos?",
        faqA3: "Você pode solicitar saques a qualquer momento. O processamento geralmente leva de 1 a 3 dias úteis, dependendo do método escolhido.",
        faqQ4: "Meu investimento é seguro?",
        faqA4: "Sim. Utilizamos segurança em nível bancário, trabalhamos com custodiantes de primeira linha e implementamos estratégias abrangentes de gestão de risco.",
        faqQ5: "Quais retornos posso esperar?",
        faqA5: "Os retornos variam conforme o plano, entre 6–10% ao ano. Desempenho passado não garante resultados futuros, mas buscamos crescimento consistente.",
        faqQ6: "Existem taxas?",
        faqA6: "Operamos com uma estrutura de taxa baseada em performance. Nosso sucesso está diretamente ligado aos seus resultados, garantindo alinhamento de interesses.",

        //portfolio
        portfolioTitle: "Desempenho do Portfólio",
        portfolioSubtitle: "Acompanhe o desempenho da nossa carteira de empréstimos e os seus retornos de investimento",
        totalInvested: "Total Investido",
        activeLoans: "Empréstimos Ativos",
        currentValue: "Valor Atual",
        totalReturn: "Retorno Total",
        performanceOverTime: "Desempenho ao Longo do Tempo",
        principalInvested: "Capital Investido",
        portfolioValue: "Valor do Portfólio",
        interestEarned: "Juros Ganhos",
        loanPortfolio: "Carteira de Empréstimos",
        loanId: "ID do Empréstimo",
        startDate: "Data de Início",
        principal: "Capital",
        interestRate: "Taxa de Juros",
        term: "Prazo",
        status: "Estado",
        returnAmount: "Retorno"
    },

    ja: {
        // Navigation
        home: "ホーム",
        login: "ログイン",
        howItWorks: "仕組み",
        calculator: "計算機",
        portfolio: "ポートフォリオ",

        // Home Page - Hero
        heroTitle: "財務の未来を築く",
        heroSubtitle: "卓越したリターンと資産保全を求める目の肥えた投資家のために設計されたエリート投資戦略。",
        getStarted: "始める",

        // How It Works - Hero
        heroTitle2: "Wealth Club とは",
        heroSubtitle2: "経済成長への旅はここから始まります。自信を持って資産を築くために設計された、シンプルで透明性の高いプロセスをご覧ください。",


        // Home Page - Stats
        stat1: "運用資産",
        stat2: "最大リターン",
        stat3: "満足している会員",
        stat4: "卓越した年数",

        // Home Page - Features
        sectionTitle: "Wealth Clubを選ぶ理由",
        sectionSubtitle: "当社の包括的な資産管理アプローチは、洗練された戦略とパーソナライズされたサービスを組み合わせています。",
        feature1Title: "戦略的投資",
        feature1Text: "当社の専門チームは、株式や債券から代替投資まで、多様な資産クラスにわたって洗練された戦略を採用し、最適なポートフォリオの分散とリスク調整後のリターンを確保します。",
        feature2Title: "資産保全",
        feature2Text: "お客様の資本を保護することが最も重要です。市場のボラティリティから資産を守りながら成長機会を捉えるため、堅牢なリスク管理フレームワークとヘッジ戦略を実装しています。",
        feature3Title: "パーソナライズされたサービス",
        feature3Text: "すべての会員は、当社の資産アドバイザーから専任の注意を受けます。お客様固有の財務目標、リスク許容度、投資期間に合わせたオーダーメイドの投資ソリューションを作成します。",
        feature4Title: "長期ビジョン",
        feature4Text: "規律ある長期投資アプローチを通じて持続可能な富の創造に焦点を当てています。当社の戦略は、市場サイクルを効果的にナビゲートしながら、着実にリターンを複利化するように設計されています。",
        feature5Title: "銀行レベルのセキュリティ",
        feature5Text: "お客様の資産と個人情報は、多要素認証、暗号化、一流のカストディアンとのパートナーシップを含む機関レベルのセキュリティ対策によって保護されています。",
        feature6Title: "透明性のあるレポート",
        feature6Text: "安全な会員ポータルを通じて、包括的なパフォーマンスレポート、詳細なポートフォリオ分析、リアルタイムのアカウント情報にアクセスできます。完全な透明性がお客様への当社のコミットメントです。",

        // How it Works - Features
        sectionTitle2: "成功への4つのシンプルなステップ",
        sectionSubtitle2: "私たちは、資産形成を身近でシンプルなものにするために、投資プロセスを合理化しました。",

        // Home Page - CTA
        ctaTitle: "投資戦略を向上させる準備はできていますか？",
        ctaSubtitle: "洗練された投資家の独占的なコミュニティに参加し、機関品質の投資機会へのアクセスを獲得してください。",
        ctaButton: "会員ポータルにアクセス",

        // How It Works Page
        step1Title: "アカウントを作成",
        step1Text: "安全な登録プロセスで数分で登録できます。基本情報を提供し、アカウントのセキュリティを確保するために本人確認を完了してください。",
        step1Feature1: "5分で簡単セットアップ",
        step1Feature2: "銀行レベルのセキュリティプロトコル",
        step1Feature3: "安全な本人確認",

        step2Title: "アカウントに資金を入金",
        step2Text: "安全な決済ゲートウェイを通じて初回入金を行います。銀行振込や暗号通貨を含む複数の資金調達オプションから選択できます。",
        step2Feature1: "複数の支払い方法",
        step2Feature2: "暗号化された取引",
        step2Feature3: "即時確認",

        step3Title: "私たちがあなたのために投資",
        step3Text: "専門チームが、高パフォーマンス資産の多様なポートフォリオに資本を配分します。私たちがあなたの富を増やすために働く間、リラックスしてください。",
        step3Feature1: "プロのポートフォリオ管理",
        step3Feature2: "多様化された資産配分",
        step3Feature3: "リスク調整戦略",

        step4Title: "富の成長を見守る",
        step4Text: "直感的なダッシュボードでリターンを監視します。パフォーマンスを追跡し、詳細な分析を表示し、必要なときにいつでも利益を引き出します。",
        step4Feature1: "リアルタイムパフォーマンス追跡",
        step4Feature2: "透明性のあるレポート",
        step4Feature3: "柔軟な出金オプション",

        plansTitle: "投資プランを選択",
        plansSubtitle: "財務目標とリスク許容度に合ったプランを選択してください。",
        annualReturns: "年間リターン",

        faqTitle: "よくある質問",
        faqSubtitle: "Wealth Clubへの投資について知っておくべきすべて。",

        faqQ1: "どのように始めればいいですか？",
        faqA1: "アカウントを作成し、本人確認を完了して入金し、投資プランを選ぶだけです。あとは私たちにお任せください。",
        faqQ2: "最低投資額はいくらですか？",
        faqA2: "入門向けのGrowthプランはわずか€10からご利用いただけます。",
        faqQ3: "資金はいつ引き出せますか？",
        faqA3: "出金はいつでもリクエストできます。処理には選択した方法により通常1〜3営業日かかります。",
        faqQ4: "投資は安全ですか？",
        faqA4: "はい。銀行レベルのセキュリティ、トップクラスのカストディアンとの提携、包括的なリスク管理を採用しています。",
        faqQ5: "期待できるリターンは？",
        faqA5: "プランにより異なりますが、年率6〜10%の範囲です。過去の実績は将来を保証するものではありませんが、安定的な成長を目指します。",
        faqQ6: "手数料はありますか？",
        faqA6: "成果連動型の手数料体系です。お客様のリターンと私たちの成功は直接的に連動しています。",

        //portfolio
        portfolioTitle: "ポートフォリオ実績",
        portfolioSubtitle: "ローンポートフォリオのパフォーマンスと投資リターンを追跡",
        totalInvested: "総投資額",
        activeLoans: "アクティブローン",
        currentValue: "現在価値",
        totalReturn: "総リターン",
        performanceOverTime: "期間別パフォーマンス",
        principalInvested: "投資元本",
        portfolioValue: "ポートフォリオ価値",
        interestEarned: "獲得利息",
        loanPortfolio: "ローンポートフォリオ",
        loanId: "ローンID",
        startDate: "開始日",
        principal: "元本",
        interestRate: "金利",
        term: "期間",
        status: "ステータス",
        returnAmount: "リターン"
    },
};

/* ============================
   TRANSLATION ENGINE
============================ */

function translatePage(lang) {
    if (!translations[lang]) {
        console.warn(`Translation for language "${lang}" not found`);
        return;
    }

    // Set HTML lang attribute
    document.documentElement.lang = lang;

    // Save language preference
    localStorage.setItem('language', lang);

    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const btnLang = btn.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
        btn.classList.toggle('active', btnLang === lang);
    });

    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

/* ============================
   AUTO-DETECT & LOAD LANGUAGE
============================ */

function detectLanguage() {
    // Check saved preference first
    const saved = localStorage.getItem('language');
    if (saved && translations[saved]) {
        return saved;
    }

    // Fall back to browser language
    const browserLang = navigator.language.slice(0, 2);
    return translations[browserLang] ? browserLang : 'en';
}

/* ============================
   INITIALIZE ON PAGE LOAD
============================ */

document.addEventListener('DOMContentLoaded', () => {
    const lang = detectLanguage();
    translatePage(lang);
});