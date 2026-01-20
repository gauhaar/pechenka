"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import PolicySidebar from '@/components/PolicySidebar';
import BackToTopButton from '@/components/BackToTopButton';
import Modal from '@/components/Modal';

const PrivacyPolicySLNC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    document.title = currentLang === 'ru' ? 'Политики SLNC-env' : 'SLNC-env Policies';
  }, [currentLang]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const content = {
    en: {
      mainTitle: "SLNC-env Privacy Policy",
      subTitle: "Privacy Policy",
      sections: [
        { id: 'introduction', title: '1. Introduction and Principles' },
        { id: 'architectural-privacy', title: '2. Architectural Privacy Guarantees' },
        { id: 'information-collection', title: '3. Information We Collect' },
        { id: 'purposes', title: '4. Purposes and Legal Bases' },
        { id: 'storage-security', title: '5. Data Storage and Security' },
        { id: 'transfer-disclosure', title: '6. Data Transfer and Disclosure' },
        { id: 'international', title: '7. International Data Transfers' },
        { id: 'user-rights', title: '8. Data Subject Rights' },
        { id: 'cookies', title: '9. Cookies and Tracking' },
        { id: 'retention', title: '10. Data Retention' },
        { id: 'children', title: '11. Children\'s Privacy' },
        { id: 'responsibilities', title: '12. Your Responsibilities' },
        { id: 'transparency', title: '13. Transparency Report' },
        { id: 'dpa', title: '14. DPA for EU Clients' },
        { id: 'changes', title: '15. Changes to Policy' },
        { id: 'contact', title: '16. Contact Information' },
        { id: 'download', title: 'Download Full Policy' },
      ],
      download: {
        title: "Download Full Policy Document",
        desc: "The detailed Privacy Policy for SLNC-env is available for download below.",
        button: "Download Full Privacy Policy (DOCX)",
        link: "/docs/Privacy_Policy_SLNC_env.docx"
      }
    },
    ru: {
      mainTitle: "Политика конфиденциальности SLNC-env",
      subTitle: "Политика конфиденциальности",
      sections: [
        { id: 'introduction', title: '1. Введение и принципы' },
        { id: 'architectural-privacy', title: '2. Архитектурные гарантии конфиденциальности' },
        { id: 'information-collection', title: '3. Информация, которую мы собираем' },
        { id: 'purposes', title: '4. Цели и правовые основания' },
        { id: 'storage-security', title: '5. Хранение и безопасность данных' },
        { id: 'transfer-disclosure', title: '6. Передача и раскрытие данных' },
        { id: 'international', title: '7. Международные передачи данных' },
        { id: 'user-rights', title: '8. Права субъектов данных' },
        { id: 'cookies', title: '9. Файлы cookie и отслеживание' },
        { id: 'retention', title: '10. Хранение данных' },
        { id: 'children', title: '11. Конфиденциальность детей' },
        { id: 'responsibilities', title: '12. Ваши обязанности' },
        { id: 'transparency', title: '13. Отчёт о прозрачности' },
        { id: 'dpa', title: '14. DPA для клиентов из ЕС' },
        { id: 'changes', title: '15. Изменения в политике' },
        { id: 'contact', title: '16. Контактная информация' },
        { id: 'download', title: 'Скачать полную политику' },
      ],
      download: {
        title: "Скачать полный текст Политики",
        desc: "Подробная Политика конфиденциальности SLNC-env доступна для скачивания ниже.",
        button: "Скачать Политику конфиденциальности (DOCX)",
        link: "/docs/ru/Политика_конфиденциальности_Silence_environment.docx"
      }
    }
  };

  const t = content[currentLang];

  return (
    <div className="bg-black text-white">
      <Header onOpenModal={openModal} policyLang={currentLang} onPolicyLangChange={setCurrentLang} />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex flex-col md:flex-row gap-8">
        <div className="md:w-80">
          <PolicySidebar sections={t.sections} />
        </div>
        <main className="flex-grow">
          <h1 className="text-4xl font-bold mb-2">{t.mainTitle}</h1>
          <h2 className="text-2xl text-gray-400 mb-8">{t.subTitle}</h2>
          <div className="space-y-8">
            {currentLang === 'en' ? (
              <>
            <section id="introduction">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction and Principles</h2>
              <p className="mb-4"><strong>1.1 Purpose of this Policy:</strong> This Privacy Policy (hereinafter referred to as the "Policy") describes the principles and practices of data processing when using the Silence Environment Ecosystem. The Policy is an integral part of the Terms of Service and should be read in conjunction with them.</p>
              <p className="mb-4"><strong>1.2 Privacy by Design Principle:</strong> The Ecosystem is built on the architectural principle of data collection minimization. Privacy is not an additional feature - it is a fundamental characteristic of the system architecture.</p>
              <p className="mb-4"><strong>1.3 Applicable Legislation:</strong> This Policy has been developed taking into account: The Law of the Republic of Kazakhstan "On Personal Data and Their Protection", The EU General Data Protection Regulation (GDPR) - for users from the European Union, Other applicable data protection regulations in the User's jurisdiction.</p>
              <p className="mb-4"><strong>1.4 Data Controller and Processor:</strong> For personal data processed in connection with subscriptions, Silence AI is the Data Controller. For data processed in the Ecosystem (your code), you are the Data Controller and we are not a processor as we do not access your development data.</p>
            </section>

            <section id="architectural-privacy">
              <h2 className="text-2xl font-semibold mb-4">2. Architectural Privacy Guarantees</h2>
              <p className="mb-4"><strong>2.1 Core Principle of Data Isolation:</strong> User source code is processed exclusively on the User's local infrastructure. The Ecosystem architecture is designed to prevent the transmission of source code to the Provider's servers.</p>
              <p className="mb-4"><strong>2.2 Technical Implementation of Isolation:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Ollama + LLM:</strong> Operates completely autonomously, contains no network data transmission functions, all computations are performed locally.</li>
                <li><strong>SLNC-Code:</strong> Operates completely autonomously, contains no functions for transmitting code to external servers, integrates only with local LLM.</li>
                <li><strong>SitHub:</strong> The only component that communicates with the Provider's servers, transmits only the data specified in section 3.2, the scanning module is isolated from network functions.</li>
              </ul>
              <p className="mb-4"><strong>2.3 What This Means in Practice:</strong> The Provider has no technical ability to access: Source code stored in the Ecosystem, Security scan results, Commit history and code changes, File names and project structure.</p>
            </section>

            <section id="information-collection">
              <h2 className="text-2xl font-semibold mb-4">3. Information We Collect</h2>
              <p className="mb-4"><strong>3.1 Subscription Information (Required):</strong> Organization name, contact email, country of registration. License Information: License key hash, subscription dates/status. Payment Information: Processed by third-party processors (we store only method type and last 4 digits).</p>
              <p className="mb-4"><strong>3.2 Technical Data from SitHub (Automatic):</strong> When verifying license/updates: License key hash, cryptographic session token, and Technical Metadata (Timestamp, SitHub version, Installation ID hash, IP address).</p>
              <p className="mb-4"><strong>3.3 Technical Telemetry (Optional):</strong> Only with explicit consent: Usage Information (Frequency of updates), Error Reports (Stack traces WITHOUT source code). Filtered to remove confidential data.</p>
              <p className="mb-4"><strong>3.4 Information We DO NOT Collect:</strong> Source Code (repositories, file contents), Analysis Results (vulnerabilities, reports), Development Metadata (file names, commit history), User Information (developer names, emails), Credentials (passwords, keys).</p>
            </section>

            <section id="purposes">
              <h2 className="text-2xl font-semibold mb-4">4. Purposes and Legal Bases for Processing</h2>
              <p className="mb-4"><strong>4.1 Subscription Management:</strong> Providing access/updates. Basis: Contract performance.</p>
              <p className="mb-4"><strong>4.2 Delivery of Security Updates:</strong> Ensuring up-to-date vulnerability databases. Basis: Contract performance.</p>
              <p className="mb-4"><strong>4.3 Service Quality Improvement:</strong> Development of security databases. Basis: Consent (for telemetry).</p>
              <p className="mb-4"><strong>4.4 Legal Compliance:</strong> Fulfilling obligations (tax/accounting). Basis: Legal obligation.</p>
              <p className="mb-4"><strong>4.5 Abuse Prevention:</strong> Fraud prevention. Basis: Legitimate interests.</p>
            </section>

             <section id="storage-security">
              <h2 className="text-2xl font-semibold mb-4">5. Data Storage and Security</h2>
              <p className="mb-4"><strong>5.1 Data Stored by Provider:</strong> Subscription info, Payment records (7 years), License key hashes, Request logs (90 days). Location: Republic of Kazakhstan.</p>
              <p className="mb-4"><strong>5.2 Data Stored on User Infrastructure:</strong> All source code, scan results, commit history. User ensures storage/backup.</p>
              <p className="mb-4"><strong>5.3 Technical Security Measures:</strong> Encryption (AES-256 at rest, TLS 1.3 in transit, Bcrypt for keys), Access Control (MFA, least privilege), Network Security (Firewalls, IDS/IPS, DDoS protection).</p>
              <p className="mb-4"><strong>5.5 Incident Notification:</strong> Providing notification within 72 hours of discovery.</p>
            </section>

            <section id="transfer-disclosure">
              <h2 className="text-2xl font-semibold mb-4">6. Data Transfer and Disclosure</h2>
              <p className="mb-4"><strong>6.1 Internal Use:</strong> Access limited to employees with confidentiality agreements (Admins, Support, Accounting).</p>
              <p className="mb-4"><strong>6.2 Third-Party Data Processors:</strong> Payment Processors (e.g., Stripe, PayPal), Hosting Providers, Monitoring Services. All sign DPAs.</p>
              <p className="mb-4"><strong>6.3 Transfers to Law Enforcement:</strong> Only when required by law/court order. We cannot provide source code as we do not have it.</p>
            </section>

            <section id="international">
              <h2 className="text-2xl font-semibold mb-4">7. International Data Transfers</h2>
              <p className="mb-4"><strong>7.1 Server Location:</strong> Main Servers: Republic of Kazakhstan.</p>
              <p className="mb-4"><strong>7.2 Transfers from EU:</strong> We use Standard Contractual Clauses (SCC) approved by the EU Commission.</p>
              <p className="mb-4"><strong>7.3 What Is Transferred:</strong> Subscription info, Update requests. NOT transferred: Source code, Scan results.</p>
            </section>

            <section id="user-rights">
              <h2 className="text-2xl font-semibold mb-4">8. Data Subject Rights</h2>
              <p className="mb-4">Applicable to all users (basic rights) and EU users (GDPR). Rights include: Access, Rectification, Erasure ("Right to be Forgotten"), Restriction of Processing, Data Portability, Objection, Withdrawal of Consent.</p>
              <p className="mb-4">Process: Send request to info@silence.codes. Response times: 30 days (GDPR) or 15 days (Kazakhstan).</p>
            </section>

            <section id="cookies">
              <h2 className="text-2xl font-semibold mb-4">9. Cookies and Tracking Technologies</h2>
              <p className="mb-4"><strong>9.1 Usage:</strong> Strictly Necessary (Auth, Language, Security), Analytics (Optional, anonymized). No third-party tracking or advertising cookies.</p>
            </section>

            <section id="retention">
              <h2 className="text-2xl font-semibold mb-4">10. Data Retention</h2>
              <p className="mb-4">Subscription info/Keys: Duration + 1 year. Payment records: 7 years. Logs: 90 days. Telemetry: 1 year. Error reports: 2 years. Automatic deletion after expiration.</p>
            </section>

            <section id="children">
              <h2 className="text-2xl font-semibold mb-4">11. Children's Privacy</h2>
              <p className="mb-4">Not intended for under 18s. 16-18 requires parental consent. We do not knowingly collect data from under 16s.</p>
            </section>

            <section id="responsibilities">
              <h2 className="text-2xl font-semibold mb-4">12. Your Data Protection Responsibilities</h2>
              <p className="mb-4">You are responsible for Infrastructure Security (Firewalls, Updates), Preventing Manual Data Transmission, User Management. Provider is not liable for user-caused breaches.</p>
            </section>

             <section id="transparency">
              <h2 className="text-2xl font-semibold mb-4">13. Transparency Report</h2>
              <p className="mb-4">Provider is committed to transparency regarding law enforcement requests and security incidents. Notifications provided within 72 hours for incidents.</p>
            </section>

            <section id="dpa">
              <h2 className="text-2xl font-semibold mb-4">14. Data Processing Agreement (DPA)</h2>
              <p className="mb-4">Available for corporate clients from the EU. Includes SCCs. Request at info@silence.codes.</p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold mb-4">15. Changes to the Privacy Policy</h2>
              <p className="mb-4">Provider may change this policy. Material changes notified 30 days in advance via email/interface. Continued use implies agreement.</p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-semibold mb-4">16. Contact Information</h2>
              <p className="mb-4">Email: info@silence.codes</p>
            </section>
              </>
            ) : (
              <>
            <section id="introduction">
              <h2 className="text-2xl font-semibold mb-4">1. Введение и принципы</h2>
              <h3 className="text-xl font-semibold mb-3 mt-6">Определения</h3>
              <p className="mb-4"><strong>Провайдер:</strong> Silence AI (далее — «Провайдер», «мы», «нас», «наш»), юридическое лицо, зарегистрированное в соответствии с законодательством Республики Казахстан.</p>
              <p className="mb-4"><strong>Пользователь:</strong> Физическое или юридическое лицо (далее — «Пользователь», «вы», «ваш»), использующее Экосистему Silence Environment.</p>
              <p className="mb-4"><strong>Экосистема:</strong> Программная платформа Silence Environment, включающая компоненты Ollama + LLM, SLNC-Code и SitHub.</p>
              <p className="mb-4"><strong>Персональные данные:</strong> Любая информация, относящаяся к идентифицированному или идентифицируемому физическому лицу.</p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">1.1 Цель настоящей Политики</h3>
              <p className="mb-4">Настоящая Политика конфиденциальности (далее — «Политика») описывает принципы и практики обработки данных при использовании Экосистемы Silence Environment. Политика является неотъемлемой частью Условий предоставления услуг и должна читаться совместно с ними.</p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">1.2 Принцип «Конфиденциальность по замыслу» (Privacy by Design)</h3>
              <p className="mb-4">Экосистема построена на архитектурном принципе минимизации сбора данных. Конфиденциальность не является дополнительной функцией — это фундаментальная характеристика архитектуры системы.</p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">1.3 Применимое законодательство</h3>
              <p className="mb-2">Настоящая Политика разработана с учётом:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Закона Республики Казахстан «О персональных данных и их защите»</li>
                <li>Общего регламента по защите данных ЕС (GDPR) — для пользователей из Европейского Союза</li>
                <li>Других применимых норм о защите данных в юрисдикции Пользователя</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">1.4 Контроллер и процессор данных</h3>
              <p className="mb-2"><strong>Для персональных данных, обрабатываемых в связи с подпиской:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Контроллер данных (Data Controller): Silence AI</li>
                <li>Мы определяем цели и средства обработки информации о подписке</li>
              </ul>
              <p className="mb-2"><strong>Для данных, обрабатываемых в Экосистеме:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Контроллер данных: Пользователь (вы контролируете свой код и данные разработки)</li>
                <li>Процессор данных: Неприменимо — мы не обрабатываем ваши данные разработки</li>
              </ul>
            </section>

            <section id="architectural-privacy">
              <h2 className="text-2xl font-semibold mb-4">2. Архитектурные гарантии конфиденциальности</h2>
              <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Основной принцип изоляции данных</h3>
              <p className="mb-4">Исходный код Пользователя обрабатывается исключительно на локальной инфраструктуре Пользователя. Архитектура Экосистемы спроектирована таким образом, чтобы предотвратить передачу исходного кода на серверы Провайдера.</p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Техническая реализация изоляции</h3>
              <p className="mb-4"><strong>Ollama + LLM:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Работает полностью автономно</li>
                <li>Не содержит функций сетевой передачи данных</li>
                <li>Все вычисления производятся локально</li>
              </ul>
              
              <p className="mb-4"><strong>SLNC-Code:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Работает полностью автономно</li>
                <li>Не содержит функций передачи кода на внешние серверы</li>
                <li>Интегрируется только с локальной LLM</li>
              </ul>
              
              <p className="mb-4"><strong>SitHub:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Единственный компонент, осуществляющий связь с серверами Провайдера</li>
                <li>Передаёт только данные, указанные в разделе 3.2</li>
                <li>Модуль сканирования изолирован от сетевых функций</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Что это означает на практике</h3>
              <p className="mb-2">Провайдер не имеет технической возможности получить доступ к:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Исходному коду, хранящемуся в Экосистеме</li>
                <li>Результатам сканирования безопасности</li>
                <li>Истории коммитов и изменений кода</li>
                <li>Именам файлов и структуре проектов</li>
              </ul>
              <p className="mb-4"><strong>Важное уточнение:</strong> Данная гарантия действует при условии правильной эксплуатации Экосистемы в соответствии с технической документацией и при отсутствии действий Пользователя по ручной передаче данных во внешние сервисы.</p>
            </section>

            <section id="information-collection">
              <h2 className="text-2xl font-semibold mb-4">3. Информация, которую мы собираем</h2>
              <h3 className="text-xl font-semibold mb-3 mt-6">3.1 Информация о подписке (обязательная)</h3>
              <p className="mb-2">Для предоставления услуг мы собираем следующую информацию:</p>
              
              <p className="mb-2"><strong>Корпоративная информация:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Название организации (для корпоративных подписок)</li>
                <li>Контактный email для связи</li>
                <li>Страна регистрации (для соблюдения применимых законов)</li>
              </ul>
              
              <p className="mb-2"><strong>Информация о лицензии:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Хеш лицензионного ключа (необратимое криптографическое преобразование)</li>
                <li>Дата активации подписки</li>
                <li>Дата истечения подписки</li>
                <li>Статус подписки (активна/неактивна/приостановлена)</li>
              </ul>
              
              <p className="mb-2"><strong>Платёжная информация:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Платёжные реквизиты обрабатываются сторонними платёжными процессорами</li>
                <li>Провайдер не хранит полные данные банковских карт</li>
                <li>Мы храним только информацию о типе платёжного метода и последних четырёх цифрах карты (для идентификации платежей)</li>
              </ul>
              <p className="mb-4"><strong>Правовое основание (для пользователей из ЕС):</strong> Исполнение договора (GDPR, статья 6(1)(b))</p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Технические данные от SitHub (автоматические)</h3>
              <p className="mb-2">При проверке лицензии и запросе обновлений SitHub передаёт:</p>
              
              <p className="mb-2"><strong>Данные аутентификации:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Хеш лицензионного ключа</li>
                <li>Криптографический токен сессии (временный)</li>
              </ul>
              
              <p className="mb-2"><strong>Технические метаданные:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Временная метка запроса (дата и время в формате UTC)</li>
                <li>Версия установленного SitHub (например, "2.1.3")</li>
                <li>Хеш идентификатора установки (необратимое преобразование уникального ID)</li>
                <li>IP-адрес (автоматически записывается сервером, используется для предотвращения злоупотреблений)</li>
              </ul>
              <p className="mb-4"><strong>Правовое основание:</strong> Законные интересы Провайдера в предотвращении мошенничества и обеспечении безопасности (GDPR, статья 6(1)(f))</p>
              <p className="mb-4"><strong>Период хранения:</strong> 90 дней</p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">3.3 Техническая телеметрия (опциональная)</h3>
              <p className="mb-2">Если вы явно согласитесь, мы можем собирать дополнительную техническую информацию для улучшения качества услуг:</p>
              
              <p className="mb-2"><strong>Информация об использовании:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Частота запросов обновлений</li>
                <li>Статистика загрузки обновлений безопасности</li>
                <li>Время последнего успешного обновления</li>
              </ul>
              
              <p className="mb-2"><strong>Отчёты об ошибках:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Трассировки стека (stack traces) без исходного кода</li>
                <li>Сообщения об ошибках</li>
                <li>Информация о системном окружении (ОС, версия, архитектура)</li>
                <li>Логи системных вызовов (без пользовательских данных)</li>
              </ul>
              <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-4 mb-4">
                <p className="font-bold text-blue-400 mb-2">Важно:</p>
                <p>Отчёты об ошибках проходят автоматическую фильтрацию для удаления любых фрагментов кода или конфиденциальных данных перед отправкой.</p>
              </div>
              <p className="mb-4"><strong>Правовое основание:</strong> Согласие (GDPR, статья 6(1)(a)) — Вы можете отозвать согласие в любое время в настройках SitHub</p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">3.4 Информация, которую мы НЕ собираем</h3>
              <p className="mb-2">Мы явно не собираем, не обрабатываем и не храним:</p>
              
              <p className="mb-2"><strong>Исходный код:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Код в репозиториях</li>
                <li>Содержимое файлов</li>
                <li>Фрагменты кода</li>
                <li>Комментарии в коде</li>
              </ul>
              
              <p className="mb-2"><strong>Результаты анализа:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Результаты сканирования безопасности</li>
                <li>Обнаруженные уязвимости в вашем коде</li>
                <li>Отчёты о качестве кода</li>
              </ul>
              
              <p className="mb-2"><strong>Метаданные разработки:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Имена файлов и каталогов</li>
                <li>Структура проектов</li>
                <li>История коммитов</li>
                <li>Сообщения коммитов</li>
                <li>Информация о ветках</li>
              </ul>
              
              <p className="mb-2"><strong>Информация о пользователях:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Имена разработчиков</li>
                <li>Email-адреса разработчиков</li>
                <li>Структура команд</li>
                <li>Права доступа внутри организации</li>
              </ul>
              
              <p className="mb-2"><strong>Учётные данные:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Пароли</li>
                <li>API-ключи</li>
                <li>Токены доступа</li>
                <li>SSH-ключи</li>
                <li>Сертификаты</li>
              </ul>
            </section>

            <section id="purposes">
              <h2 className="text-2xl font-semibold mb-4">4. Цели и правовые основания обработки</h2>
              <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Управление подпиской</h3>
              <p className="mb-2"><strong>Цель:</strong> Предоставление доступа к Экосистеме и обновлениям</p>
              <p className="mb-2"><strong>Обрабатываемые данные:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Информация о подписке (раздел 3.1)</li>
                <li>Статус лицензии</li>
              </ul>
              <p className="mb-2"><strong>Правовое основание:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Исполнение договора (GDPR, статья 6(1)(b))</li>
                <li>Для РК: согласие на обработку персональных данных при заключении договора</li>
              </ul>
              <p className="mb-2"><strong>Действия:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Проверка активности лицензии</li>
                <li>Обработка продлений подписки</li>
                <li>Отправка уведомлений о статусе подписки</li>
                <li>Предоставление доступа к обновлениям безопасности</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Доставка обновлений безопасности</h3>
              <p className="mb-2"><strong>Цель:</strong> Обеспечение актуальности баз данных уязвимостей</p>
              <p className="mb-2"><strong>Обрабатываемые данные:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Хеш лицензионного ключа</li>
                <li>Версия SitHub</li>
                <li>Временные метки запросов</li>
              </ul>
              <p className="mb-4"><strong>Правовое основание:</strong> Исполнение договора (GDPR, статья 6(1)(b))</p>
              <p className="mb-2"><strong>Действия:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Аутентификация запросов обновлений</li>
                <li>Передача баз данных уязвимостей</li>
                <li>Передача патчей безопасности</li>
                <li>Мониторинг работоспособности службы обновлений</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">4.3 Улучшение качества услуг</h3>
              <p className="mb-2"><strong>Цель:</strong> Разработка и улучшение баз данных безопасности</p>
              <p className="mb-2"><strong>Обрабатываемые данные:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Техническая телеметрия (только если вы дали согласие)</li>
                <li>Анонимные отчёты об ошибках</li>
              </ul>
              <p className="mb-4"><strong>Правовое основание:</strong> Согласие (GDPR, статья 6(1)(a))</p>
              <p className="mb-2"><strong>Действия:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Исследование новых угроз и уязвимостей</li>
                <li>Улучшение точности обнаружения уязвимостей</li>
                <li>Разработка новых сигнатур безопасности</li>
                <li>Устранение ошибок в компонентах Экосистемы</li>
              </ul>
              <p className="mb-4"><strong>Источники информации:</strong> Результаты анализа угроз, проведенного подразделением Threat Hunters компании Silence AI. <strong>НЕ ваш код.</strong></p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">4.4 Соблюдение законодательства</h3>
              <p className="mb-2"><strong>Цель:</strong> Выполнение юридических обязательств</p>
              <p className="mb-2"><strong>Обрабатываемые данные:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Информация о подписке</li>
                <li>Платёжные записи</li>
              </ul>
              <p className="mb-2"><strong>Правовое основание:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Юридическое обязательство (GDPR, статья 6(1)(c))</li>
                <li>Для РК: требования налогового и бухгалтерского законодательства</li>
              </ul>
              <p className="mb-2"><strong>Действия:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Хранение платёжных записей (7 лет — требование налогового законодательства)</li>
                <li>Ответы на судебные запросы</li>
                <li>Предоставление информации регулирующим органам (только при наличии законного основания)</li>
                <li>Предотвращение мошенничества</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">4.5 Предотвращение злоупотреблений</h3>
              <p className="mb-2"><strong>Цель:</strong> Защита от мошенничества и нарушений Условий</p>
              <p className="mb-2"><strong>Обрабатываемые данные:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>IP-адреса запросов</li>
                <li>Частота запросов обновлений</li>
                <li>Паттерны использования</li>
              </ul>
              <p className="mb-2"><strong>Правовое основание:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Законные интересы (GDPR, статья 6(1)(f))</li>
                <li>Наши законные интересы: предотвращение мошенничества, защита от злоупотреблений лицензиями</li>
              </ul>
              <p className="mb-2"><strong>Действия:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Выявление подозрительной активности</li>
                <li>Блокировка скомпрометированных лицензий</li>
                <li>Предотвращение несанкционированного распространения</li>
              </ul>
            </section>

             <section id="storage-security">
              <h2 className="text-2xl font-semibold mb-4">5. Хранение и безопасность данных</h2>
              <h3 className="text-xl font-semibold mb-3 mt-6">5.1 Данные, хранимые Провайдером</h3>
              <p className="mb-2">На серверах Провайдера хранятся только:</p>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-600">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="border border-gray-600 px-4 py-2 text-left">Тип данных</th>
                      <th className="border border-gray-600 px-4 py-2 text-left">Местонахождение</th>
                      <th className="border border-gray-600 px-4 py-2 text-left">Шифрование</th>
                      <th className="border border-gray-600 px-4 py-2 text-left">Срок хранения</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Информация о подписке</td>
                      <td className="border border-gray-600 px-4 py-2">Республика Казахстан</td>
                      <td className="border border-gray-600 px-4 py-2">AES-256</td>
                      <td className="border border-gray-600 px-4 py-2">Период действия + 1 год</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Платёжные записи</td>
                      <td className="border border-gray-600 px-4 py-2">Обработчик платежей</td>
                      <td className="border border-gray-600 px-4 py-2">Соответствует PCI DSS</td>
                      <td className="border border-gray-600 px-4 py-2">7 лет (требование закона)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Хеши лицензионных ключей</td>
                      <td className="border border-gray-600 px-4 py-2">Республика Казахстан</td>
                      <td className="border border-gray-600 px-4 py-2">Bcrypt</td>
                      <td className="border border-gray-600 px-4 py-2">Период действия + 1 год</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Журналы запросов</td>
                      <td className="border border-gray-600 px-4 py-2">Республика Казахстан</td>
                      <td className="border border-gray-600 px-4 py-2">TLS 1.3 при передаче</td>
                      <td className="border border-gray-600 px-4 py-2">90 дней</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Базы данных безопасности</td>
                      <td className="border border-gray-600 px-4 py-2">Республика Казахстан (зеркала в ЕС)</td>
                      <td className="border border-gray-600 px-4 py-2">Не требуется (публичная информация)</td>
                      <td className="border border-gray-600 px-4 py-2">Постоянно (продукт)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Данные, хранимые на инфраструктуре Пользователя</h3>
              <p className="mb-2">Исключительно на вашей инфраструктуре:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Весь исходный код</li>
                <li>Результаты сканирования безопасности</li>
                <li>История коммитов</li>
                <li>Метаданные репозиториев</li>
                <li>Информация о пользователях и правах доступа</li>
                <li>Загруженные базы данных уязвимостей</li>
              </ul>
              <p className="mb-4"><strong>Ответственность:</strong> Пользователь самостоятельно обеспечивает хранение, резервное копирование и безопасность этих данных.</p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">5.3 Меры технической безопасности</h3>
              <p className="mb-2">Провайдер применяет следующие меры для защиты данных, хранимых на наших серверах:</p>
              
              <p className="mb-2"><strong>Шифрование:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>В состоянии покоя: AES-256 для баз данных с конфиденциальной информацией</li>
                <li>При передаче: TLS 1.3 (минимум TLS 1.2 не принимается)</li>
                <li>Хеширование: Bcrypt для лицензионных ключей (необратимое преобразование)</li>
              </ul>
              
              <p className="mb-2"><strong>Контроль доступа:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Многофакторная аутентификация для административного доступа</li>
                <li>Принцип минимальных привилегий для сотрудников</li>
                <li>Журналирование всех административных действий</li>
                <li>Регулярный аудит прав доступа</li>
              </ul>
              
              <p className="mb-2"><strong>Сетевая безопасность:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Межсетевые экраны на периметре</li>
                <li>Системы обнаружения вторжений (IDS/IPS)</li>
                <li>DDoS-защита</li>
                <li>Регулярное сканирование на уязвимости</li>
              </ul>
              
              <p className="mb-2"><strong>Мониторинг и реагирование:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>24/7 мониторинг безопасности</li>
                <li>Автоматические оповещения о подозрительной активности</li>
                <li>План реагирования на инциденты</li>
                <li>Регулярные учения по безопасности</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">5.4 Аудит безопасности</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Ежегодный независимый аудит безопасности сторонней фирмой</li>
                <li>Регулярное тестирование на проникновение</li>
                <li>Публикация сводных отчётов (без раскрытия уязвимостей)</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">5.5 Уведомление об инцидентах</h3>
              <p className="mb-2">В случае инцидента безопасности, затрагивающего ваши данные:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Уведомление Пользователей: в течение 72 часов с момента обнаружения</li>
                <li>Уведомление регуляторов (для пользователей из ЕС): в течение 72 часов (требование GDPR)</li>
                <li>Уведомление регуляторов РК: в соответствии с законодательством о персональных данных</li>
              </ul>
            </section>

            <section id="transfer-disclosure">
              <h2 className="text-2xl font-semibold mb-4">6. Передача и раскрытие данных</h2>
              <h3 className="text-xl font-semibold mb-3 mt-6">6.1 Внутреннее использование</h3>
              <p className="mb-2">Доступ к данным Пользователей имеют только сотрудники Провайдера, которым это необходимо для выполнения служебных обязанностей:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Администраторы систем (для обслуживания инфраструктуры)</li>
                <li>Служба поддержки (для решения технических проблем)</li>
                <li>Бухгалтерия (для обработки платежей)</li>
              </ul>
              <p className="mb-4">Все сотрудники подписывают соглашения о конфиденциальности.</p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">6.2 Сторонние обработчики данных</h3>
              <p className="mb-2">Мы используем следующие категории сторонних обработчиков:</p>
              
              <p className="mb-2"><strong>Платёжные процессоры:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Для обработки платежей по подписке</li>
                <li>Соответствуют стандарту PCI DSS</li>
                <li>Примеры: Stripe, PayPal, Kaspi.kz (для клиентов из РК)</li>
                <li>Имеют собственные политики конфиденциальности</li>
              </ul>
              
              <p className="mb-2"><strong>Хостинг-провайдеры:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Для размещения серверов обновлений</li>
                <li>Местонахождение: Республика Казахстан (основные серверы), ЕС (зеркала для клиентов из ЕС)</li>
                <li>Работают в соответствии с соглашениями об обработке данных (DPA)</li>
              </ul>
              
              <p className="mb-2"><strong>Службы мониторинга и безопасности:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Для обеспечения работоспособности и безопасности инфраструктуры</li>
                <li>Доступ ограничен техническими метаданными (логи, метрики)</li>
                <li>Не имеют доступа к информации о подписках</li>
              </ul>
              
              <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-4 mb-4">
                <p className="font-bold text-blue-400 mb-2">Важно:</p>
                <p className="mb-2">Все сторонние обработчики:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Подписывают соглашения об обработке данных (DPA)</li>
                  <li>Соблюдают принцип минимизации доступа</li>
                  <li>Не используют данные для собственных целей</li>
                </ul>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">6.3 Передачи в правоохранительные органы</h3>
              <p className="mb-2">Мы можем раскрывать информацию правоохранительным или регулирующим органам:</p>
              
              <p className="mb-2"><strong>Когда это требуется:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>По судебному приказу</li>
                <li>По повестке в суд</li>
                <li>При наличии юридического обязательства в соответствии с применимым законодательством</li>
              </ul>
              
              <p className="mb-2"><strong>Процедура:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Проверка законности запроса юридическим отделом</li>
                <li>Предоставление только минимально необходимой информации</li>
                <li>Уведомление Пользователя (если это не запрещено судебным приказом)</li>
                <li>Документирование всех запросов для отчёта о прозрачности</li>
              </ul>
              
              <p className="mb-2"><strong>Что НЕ может быть предоставлено:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Исходный код (так как мы его не храним)</li>
                <li>Результаты сканирования (так как они хранятся локально у Пользователя)</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">6.4 Передачи при реорганизации бизнеса</h3>
              <p className="mb-2">В случае слияния, поглощения или продажи бизнеса:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Информация о подписках может быть передана правопреемнику</li>
                <li>Пользователи будут уведомлены за 30 дней</li>
                <li>Правопреемник обязан соблюдать настоящую Политику</li>
                <li>У Пользователей будет возможность прекратить подписку с возвратом пропорциональной части оплаты</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">6.5 Что мы НИКОГДА не делаем</h3>
              <p className="mb-2">Провайдер никогда не будет:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Продавать данные Пользователей третьим лицам</li>
                <li>Сдавать данные в аренду для маркетинговых целей</li>
                <li>Монетизировать данные помимо оплаты подписки</li>
                <li>Передавать данные брокерам данных</li>
                <li>Использовать данные для таргетированной рекламы</li>
              </ul>
            </section>

            <section id="international">
              <h2 className="text-2xl font-semibold mb-4">7. Международные передачи данных</h2>
              <h3 className="text-xl font-semibold mb-3 mt-6">7.1 Местонахождение серверов</h3>
              <p className="mb-4"><strong>Основные серверы:</strong> Республика Казахстан</p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">7.2 Передачи из ЕС в Казахстан (для пользователей из ЕС)</h3>
              <p className="mb-4"><strong>Правовое основание для передачи:</strong> Провайдер использует Стандартные договорные оговорки (Standard Contractual Clauses, SCC), утверждённые Решением Европейской Комиссии 2021/914.</p>
              
              <p className="mb-2"><strong>Дополнительные меры защиты:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Шифрование данных при передаче (TLS 1.3)</li>
                <li>Шифрование данных в состоянии покоя (AES-256)</li>
                <li>Ограниченный доступ к данным</li>
                <li>Регулярный аудит безопасности</li>
              </ul>
              
              <p className="mb-2"><strong>Доступ SCC:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Стандартные договорные оговорки доступны для ознакомления по запросу</li>
                <li>Отправьте запрос на: info@silence.codes</li>
                <li>SCC автоматически включаются в Соглашение об обработке данных (DPA) для корпоративных клиентов из ЕС</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">7.3 Что передаётся международно</h3>
              <p className="mb-2">При использовании из-за пределов Казахстана передаются:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Информация о подписке (для управления лицензией)</li>
                <li>Запросы на загрузку обновлений безопасности</li>
                <li>Базы данных безопасности (загружаются к вам)</li>
              </ul>
              
              <p className="mb-2"><strong>Что НЕ передаётся:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Исходный код (остаётся на вашей локальной инфраструктуре)</li>
                <li>Результаты сканирования (обрабатываются локально)</li>
                <li>Информация о разработчиках (управляется локально)</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">7.4 Локализация данных для клиентов из РК</h3>
              <p className="mb-4">Для клиентов, находящихся в Республике Казахстан, все данные хранятся на серверах в РК в соответствии с требованиями законодательства о локализации данных (если применимо).</p>
            </section>

            <section id="user-rights">
              <h2 className="text-2xl font-semibold mb-4">8. Права субъектов данных</h2>
              <h3 className="text-xl font-semibold mb-3 mt-6">8.1 Применимость прав</h3>
              <p className="mb-2">Права, описанные в этом разделе, применяются:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Для всех Пользователей:</strong> базовые права в соответствии с законодательством РК</li>
                <li><strong>Для Пользователей из ЕС:</strong> расширенные права в соответствии с GDPR</li>
                <li><strong>Для Пользователей из других юрисдикций:</strong> права в соответствии с применимым законодательством</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">8.2 Право на доступ (GDPR, статья 15)</h3>
              <p className="mb-2">Вы имеете право получить:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Подтверждение, обрабатываем ли мы ваши персональные данные</li>
                <li>Копию ваших персональных данных</li>
                <li>Информацию о целях обработки, категориях данных, получателях</li>
                <li>Срок хранения данных</li>
                <li>Информацию о ваших правах</li>
              </ul>
              <p className="mb-2"><strong>Как реализовать:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Отправьте запрос на: info@silence.codes</li>
                <li>Мы ответим в течение 30 дней (GDPR) или 15 дней (законодательство РК)</li>
                <li>Предоставим данные в структурированном, общеупотребительном формате (JSON или PDF)</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">8.3 Право на исправление (GDPR, статья 16)</h3>
              <p className="mb-2">Вы имеете право исправить неточные персональные данные:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Исправление контактной информации</li>
                <li>Обновление названия организации</li>
                <li>Корректировка платёжных реквизитов</li>
              </ul>
              <p className="mb-2"><strong>Как реализовать:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Войдите в личный кабинет и обновите информацию</li>
                <li>Или отправьте запрос на: info@silence.codes</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">8.4 Право на удаление / «Право быть забытым» (GDPR, статья 17)</h3>
              <p className="mb-2">Вы имеете право запросить удаление ваших персональных данных в следующих случаях:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Данные больше не нужны для целей обработки</li>
                <li>Вы отзываете согласие (для обработки на основе согласия)</li>
                <li>Данные обрабатывались незаконно</li>
                <li>Удаление требуется для соблюдения юридического обязательства</li>
              </ul>
              <p className="mb-2"><strong>Ограничения:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Мы не можем удалить данные, если их хранение требуется законом (например, платёжные записи — 7 лет)</li>
                <li>Мы не можем удалить данные, необходимые для исполнения договора (пока подписка активна)</li>
              </ul>
              <p className="mb-2"><strong>Как реализовать:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Отправьте запрос на: info@silence.codes</li>
                <li>Мы удалим данные в течение 30 дней (за исключением данных с законодательными требованиями хранения)</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">8.5 Право на ограничение обработки (GDPR, статья 18)</h3>
              <p className="mb-2">Вы можете запросить ограничение обработки ваших данных:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Пока проверяется точность данных (по вашему запросу)</li>
                <li>Если обработка незаконна, но вы не хотите удаления</li>
                <li>Если данные нужны вам для юридических целей</li>
              </ul>
              <p className="mb-4"><strong>Как реализовать:</strong> Отправьте запрос на: info@silence.codes с указанием причины</p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">8.6 Право на переносимость данных (GDPR, статья 20)</h3>
              <p className="mb-2">Вы имеете право получить свои данные в структурированном, машиночитаемом формате:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Данные, которые вы предоставили нам</li>
                <li>Обработка которых основана на согласии или договоре</li>
                <li>Обработка которых осуществляется автоматизированными средствами</li>
              </ul>
              <p className="mb-4"><strong>Форматы:</strong> JSON, CSV, XML</p>
              <p className="mb-2"><strong>Как реализовать:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Отправьте запрос на: info@silence.codes</li>
                <li>Укажите предпочтительный формат</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">8.7 Право на возражение (GDPR, статья 21)</h3>
              <p className="mb-4">Вы имеете право возразить против обработки, основанной на законных интересах (например, против обработки для предотвращения мошенничества).</p>
              <p className="mb-4">Мы прекратим обработку, если не сможем продемонстрировать преобладающие законные основания.</p>
              <p className="mb-4"><strong>Как реализовать:</strong> Отправьте запрос на: info@silence.codes с указанием причины возражения</p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">8.8 Право на отзыв согласия (GDPR, статья 7(3))</h3>
              <p className="mb-4">Если обработка основана на согласии, вы можете отозвать согласие в любое время (например, для технической телеметрии).</p>
              <p className="mb-4">Отзыв не влияет на законность обработки до отзыва.</p>
              <p className="mb-2"><strong>Как реализовать:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>В настройках SitHub: отключите опцию "Отправка телеметрии"</li>
                <li>Или отправьте запрос на: info@silence.codes</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">8.9 Право на жалобу в надзорный орган</h3>
              <p className="mb-4"><strong>Для пользователей из ЕС:</strong> Вы имеете право подать жалобу в надзорный орган по защите данных вашей страны.</p>
              <p className="mb-4"><strong>Для пользователей из РК:</strong> Вы можете обратиться в уполномоченный орган по защите прав субъектов персональных данных Республики Казахстан.</p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">8.10 Сроки ответа на запросы</h3>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-600">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="border border-gray-600 px-4 py-2 text-left">Тип запроса</th>
                      <th className="border border-gray-600 px-4 py-2 text-left">Срок ответа (GDPR)</th>
                      <th className="border border-gray-600 px-4 py-2 text-left">Срок ответа (РК)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Доступ к данным</td>
                      <td className="border border-gray-600 px-4 py-2">30 дней</td>
                      <td className="border border-gray-600 px-4 py-2">15 дней</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Исправление</td>
                      <td className="border border-gray-600 px-4 py-2">30 дней</td>
                      <td className="border border-gray-600 px-4 py-2">15 дней</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Удаление</td>
                      <td className="border border-gray-600 px-4 py-2">30 дней</td>
                      <td className="border border-gray-600 px-4 py-2">15 дней</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Другие запросы</td>
                      <td className="border border-gray-600 px-4 py-2">30 дней</td>
                      <td className="border border-gray-600 px-4 py-2">15 дней</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mb-4">Сроки могут быть продлены на 2 месяца (GDPR) при сложных запросах с обязательным уведомлением.</p>
            </section>

            <section id="cookies">
              <h2 className="text-2xl font-semibold mb-4">9. Файлы cookie и технологии отслеживания</h2>
              <h3 className="text-xl font-semibold mb-3 mt-6">9.1 Использование cookies</h3>
              <p className="mb-2">Провайдер использует минимальное количество cookies:</p>
              
              <p className="mb-2"><strong>Строго необходимые cookies (не требуют согласия):</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Сессионный cookie для аутентификации в личном кабинете</li>
                <li>Cookie для сохранения языковых предпочтений</li>
                <li>Cookie для безопасности (CSRF-токены)</li>
              </ul>
              <p className="mb-4"><strong>Срок действия:</strong> до конца сессии или 30 дней</p>
              
              <p className="mb-2"><strong>Аналитические cookies (требуют согласия):</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Если включено: базовая аналитика использования веб-сайта (не SitHub)</li>
                <li>Используем собственное решение (не Google Analytics)</li>
                <li>Данные анонимизированы</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">9.2 Управление cookies</h3>
              <p className="mb-2">Вы можете:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Отклонить необязательные cookies при первом посещении сайта</li>
                <li>Изменить настройки в любое время в настройках браузера</li>
                <li>Удалить существующие cookies через настройки браузера</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">9.3 Отсутствие отслеживания</h3>
              <p className="mb-2">Мы <strong>НЕ</strong> используем:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Трекеры социальных сетей</li>
                <li>Рекламные трекеры</li>
                <li>Трекеры третьих сторон для профилирования</li>
                <li>Системы межсайтового отслеживания</li>
              </ul>
            </section>

            <section id="retention">
              <h2 className="text-2xl font-semibold mb-4">10. Хранение данных</h2>
              <h3 className="text-xl font-semibold mb-3 mt-6">10.1 Сроки хранения</h3>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-600">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="border border-gray-600 px-4 py-2 text-left">Тип данных</th>
                      <th className="border border-gray-600 px-4 py-2 text-left">Срок хранения</th>
                      <th className="border border-gray-600 px-4 py-2 text-left">Правовое основание</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Информация о подписке</td>
                      <td className="border border-gray-600 px-4 py-2">Период действия + 1 год</td>
                      <td className="border border-gray-600 px-4 py-2">Возможные споры, возвраты</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Платёжные записи</td>
                      <td className="border border-gray-600 px-4 py-2">7 лет после транзакции</td>
                      <td className="border border-gray-600 px-4 py-2">Налоговое законодательство РК, ЕС</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Хеши лицензионных ключей</td>
                      <td className="border border-gray-600 px-4 py-2">Период действия + 1 год</td>
                      <td className="border border-gray-600 px-4 py-2">Предотвращение злоупотреблений</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Журналы запросов обновлений</td>
                      <td className="border border-gray-600 px-4 py-2">90 дней</td>
                      <td className="border border-gray-600 px-4 py-2">Техническая поддержка, безопасность</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Техническая телеметрия</td>
                      <td className="border border-gray-600 px-4 py-2">1 год</td>
                      <td className="border border-gray-600 px-4 py-2">Улучшение услуг</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-4 py-2">Отчёты об ошибках</td>
                      <td className="border border-gray-600 px-4 py-2">2 года</td>
                      <td className="border border-gray-600 px-4 py-2">Устранение ошибок</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">10.2 Удаление после истечения сроков</h3>
              <p className="mb-2">По истечении срока хранения:</p>
              <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>Данные автоматически помечаются для удаления</li>
                <li>Безвозвратное удаление происходит в течение 30 дней</li>
                <li>Резервные копии перезаписываются в течение 90 дней</li>
                <li>Логи удаления сохраняются для аудита</li>
              </ol>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">10.3 Досрочное удаление</h3>
              <p className="mb-2">Вы можете запросить досрочное удаление данных (кроме данных с законодательными требованиями хранения):</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Отправьте запрос на: info@silence.codes</li>
                <li>Укажите, какие данные вы хотите удалить</li>
                <li>Мы выполним запрос в течение 30 дней</li>
              </ul>
            </section>

            <section id="children">
              <h2 className="text-2xl font-semibold mb-4">11. Конфиденциальность детей</h2>
              <h3 className="text-xl font-semibold mb-3 mt-6">11.1 Возрастные ограничения</h3>
              <p className="mb-2">Экосистема не предназначена для использования лицами младше 18 лет:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Это профессиональный инструмент разработки</li>
                <li>Это корпоративное программное обеспечение</li>
                <li>Мы не собираем сознательно данные от лиц младше 18 лет</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">11.2 Исключение: использование с согласия родителей</h3>
              <p className="mb-4">Лица в возрасте 16-18 лет могут использовать Экосистему с письменного согласия родителя или законного опекуна.</p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">11.3 Обнаружение и удаление данных несовершеннолетних</h3>
              <p className="mb-2">Если мы обнаружим, что собрали данные от лица младше 16 лет:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Мы немедленно удалим всю информацию</li>
                <li>Мы деактивируем учётную запись</li>
                <li>Мы уведомим контактное лицо (если доступно)</li>
              </ul>
              <p className="mb-2"><strong>Для родителей:</strong> Если вы обнаружили, что ваш ребенок использует Экосистему без вашего согласия:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Свяжитесь с нами: info@silence.codes</li>
                <li>Мы закроем учётную запись и удалим данные в течение 48 часов</li>
              </ul>
            </section>

            <section id="responsibilities">
              <h2 className="text-2xl font-semibold mb-4">12. Ваши обязанности по защите данных</h2>
              <h3 className="text-xl font-semibold mb-3 mt-6">12.1 Обязанности Пользователя</h3>
              <p className="mb-2">Провайдер обеспечивает конфиденциальность на уровне архитектуры. Вы несёте ответственность за:</p>
              
              <p className="mb-2"><strong>Безопасность инфраструктуры:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Надлежащую конфигурацию межсетевых экранов</li>
                <li>Контроль доступа к серверам, на которых развёрнута Экосистема</li>
                <li>Регулярное обновление операционных систем</li>
                <li>Физическую безопасность оборудования</li>
              </ul>
              
              <p className="mb-2"><strong>Предотвращение ручной передачи данных:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Не загружайте код вручную во внешние облачные сервисы</li>
                <li>Не копируйте репозитории в публично доступные сервисы (GitHub, GitLab и т.д.)</li>
                <li>Обучайте разработчиков принципам безопасной работы</li>
              </ul>
              
              <p className="mb-2"><strong>Управление пользователями:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Контролируйте, кто имеет доступ к Экосистеме</li>
                <li>Используйте надёжные пароли и многофакторную аутентификацию</li>
                <li>Своевременно отзывайте доступ уволенных сотрудников</li>
                <li>Применяйте принцип минимальных привилегий</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">12.2 Ограничение ответственности Провайдера</h3>
              <p className="mb-2">Провайдер не несёт ответственности за утечки данных, вызванные:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Действиями Пользователя или его сотрудников</li>
                <li>Компрометацией инфраструктуры Пользователя</li>
                <li>Неправильной конфигурацией безопасности на стороне Пользователя</li>
                <li>Вредоносным ПО на оборудовании Пользователя</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">12.3 Обработка персональных данных разработчиков</h3>
              <p className="mb-2">Если вы используете Экосистему для управления командой разработчиков:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Вы являетесь контроллером данных ваших сотрудников</li>
                <li>Вы обязаны соблюдать применимое законодательство о защите данных</li>
                <li>Вы обязаны информировать сотрудников об обработке их данных</li>
                <li>Провайдер не имеет доступа к этим данным и не несёт ответственности за их обработку</li>
              </ul>
            </section>

             <section id="transparency">
              <h2 className="text-2xl font-semibold mb-4">13. Отчёт о прозрачности</h2>
              <h3 className="text-xl font-semibold mb-3 mt-6">13.1 Обязательство по прозрачности</h3>
              <p className="mb-2">Провайдер привержен прозрачности в отношении:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Запросов правоохранительных органов</li>
                <li>Инцидентов безопасности</li>
                <li>Изменений в практиках обработки данных</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">13.2 Уведомление об инцидентах безопасности</h3>
              <p className="mb-2">В случае нарушения безопасности данных:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Уведомление Пользователей:</strong> в течение 72 часов с момента обнаружения</li>
                <li><strong>Содержание уведомления:</strong>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Описание инцидента</li>
                    <li>Категории и количество затронутых данных</li>
                    <li>Возможные последствия</li>
                    <li>Принятые меры по устранению</li>
                    <li>Рекомендации для Пользователей</li>
                  </ul>
                </li>
                <li><strong>Способ уведомления:</strong> email + уведомление в интерфейсе SitHub</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">13.3 Раскрытие запросов правоохранительных органов</h3>
              <p className="mb-2">Провайдер будет уведомлять Пользователей о запросах правоохранительных органов:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>За исключением случаев, когда уведомление запрещено судебным приказом</li>
                <li>С указанием характера запроса (без раскрытия деталей расследования)</li>
                <li>С предоставлением копии запроса (если это разрешено)</li>
              </ul>
            </section>

            <section id="dpa">
              <h2 className="text-2xl font-semibold mb-4">14. Соглашение об обработке данных (DPA) для корпоративных клиентов из ЕС</h2>
              <h3 className="text-xl font-semibold mb-3 mt-6">14.1 Применимость DPA</h3>
              <p className="mb-4">Для корпоративных клиентов из Европейского Союза, которые используют Экосистему для обработки персональных данных своих сотрудников, Провайдер предоставляет Соглашение об обработке данных (Data Processing Agreement, DPA).</p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">14.2 Содержание DPA</h3>
              <p className="mb-2">DPA включает:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Стандартные договорные оговорки (SCC) ЕС</li>
                <li>Описание предмета и срока обработки</li>
                <li>Характер и цели обработки</li>
                <li>Типы персональных данных</li>
                <li>Категории субъектов данных</li>
                <li>Обязанности и права контроллера и процессора</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">14.3 Запрос DPA</h3>
              <p className="mb-2">Чтобы запросить DPA:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Отправьте запрос на: info@silence.codes</li>
                <li>Укажите название вашей организации и контактную информацию</li>
                <li>DPA будет предоставлен в течение 5 рабочих дней</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">14.4 Субпроцессоры</h3>
              <p className="mb-4">Список субпроцессоров (хостинг-провайдеры, платёжные системы) указывается в DPA. Пользователи будут уведомлены за 30 дней о добавлении новых субпроцессоров.</p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold mb-4">15. Изменения в Политике конфиденциальности</h2>
              <h3 className="text-xl font-semibold mb-3 mt-6">15.1 Право на изменение</h3>
              <p className="mb-2">Провайдер оставляет за собой право изменять настоящую Политику по следующим причинам:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Изменения в применимом законодательстве</li>
                <li>Развитие функциональности Экосистемы</li>
                <li>Улучшение защиты прав Пользователей</li>
                <li>Изменения в практиках обработки данных</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">15.2 Уведомление об изменениях</h3>
              <p className="mb-4"><strong>Несущественные изменения</strong> (исправление опечаток, уточнение формулировок): Публикуются на веб-сайте с указанием новой даты вступления в силу</p>
              
              <p className="mb-2"><strong>Существенные изменения</strong> (влияющие на права или изменяющие практики обработки):</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Email-уведомление за 30 дней до вступления в силу</li>
                <li>Уведомление в интерфейсе SitHub</li>
                <li>Публикация на веб-сайте с выделением изменений</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">15.3 Согласие с изменениями</h3>
              <p className="mb-4">Продолжая использовать Экосистему после вступления изменений в силу, вы подтверждаете согласие с обновлённой Политикой.</p>
              <p className="mb-2">Если вы не согласны с изменениями:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Вы имеете право прекратить использование Экосистемы</li>
                <li>При отмене в течение 14 дней после уведомления о существенных изменениях — пропорциональный возврат средств</li>
              </ul>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-semibold mb-4">16. Контактная информация</h2>
              <p className="mb-4"><strong>Вопросы о конфиденциальности?</strong> Вопросы по данной политике? Вопросы о том, какие данные мы храним?</p>
              <p className="mb-4"><strong>Свяжитесь с нами:</strong></p>
              <p className="mb-4">Email: info@silence.codes</p>
              <p className="mb-4 text-gray-400">Настоящая Политика конфиденциальности разработана для обеспечения прозрачности наших практик обработки данных и защиты ваших прав. Экосистема Silence Environment построена на принципе минимизации сбора данных: мы собираем только информацию, необходимую для предоставления услуг, и никогда не получаем доступ к вашему исходному коду.</p>
              <p className="mb-4 text-gray-500 text-sm">Дата вступления в силу: 13.01.2026</p>
            </section>
              </>
            )}

            <section id="download">
              <h2 className="text-2xl font-semibold mb-4">{t.download.title}</h2>
              <p className="mb-4">
                {t.download.desc}
              </p>
              <a 
                href={t.download.link}
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                download
              >
                {t.download.button}
              </a>
            </section>
          </div>
        </main>
      </div>
      <BackToTopButton />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default PrivacyPolicySLNC;
