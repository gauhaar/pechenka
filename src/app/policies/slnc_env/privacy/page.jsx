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
      mainTitle: "SLNC-env Policy",
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
      mainTitle: "Политика SLNC-env",
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
              <p className="mb-4"><strong>1.1 Цель настоящей Политики:</strong> Настоящая Политика конфиденциальности (далее – «Политика») описывает принципы и практики обработки данных при использовании Экосистемы Silence Environment. Политика является неотъемлемой частью Условий предоставления услуг и должна читаться совместно с ними.</p>
              <p className="mb-4"><strong>1.2 Принцип «Конфиденциальность по замыслу» (Privacy by Design):</strong> Экосистема построена на архитектурном принципе минимизации сбора данных. Конфиденциальность не является дополнительной функцией – это фундаментальная характеристика архитектуры системы.</p>
              <p className="mb-4"><strong>1.3 Применимое законодательство:</strong> Настоящая Политика разработана с учётом: Закона Республики Казахстан «О персональных данных и их защите», Общего регламента по защите данных ЕС (GDPR) – для пользователей из Европейского Союза, других применимых норм о защите данных в юрисдикции Пользователя.</p>
              <p className="mb-4"><strong>1.4 Контроллер и процессор данных:</strong> Для персональных данных, обрабатываемых в связи с подпиской, Silence AI является Контроллером данных. Для данных, обрабатываемых в Экосистеме (ваш код), вы являетесь Контроллером данных, а мы не являемся процессором, так как не обрабатываем ваши данные разработки.</p>
            </section>

            <section id="architectural-privacy">
              <h2 className="text-2xl font-semibold mb-4">2. Архитектурные гарантии конфиденциальности</h2>
              <p className="mb-4"><strong>2.1 Основной принцип изоляции данных:</strong> Исходный код Пользователя обрабатывается исключительно на локальной инфраструктуре Пользователя. Архитектура Экосистемы спроектирована таким образом, чтобы предотвратить передачу исходного кода на серверы Провайдера.</p>
              <p className="mb-4"><strong>2.2 Техническая реализация изоляции:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Ollama + LLM:</strong> Работает полностью автономно, не содержит функций сетевой передачи данных, все вычисления производятся локально.</li>
                <li><strong>SLNC-Code:</strong> Работает полностью автономно, не содержит функций передачи кода на внешние серверы, интегрируется только с локальной LLM.</li>
                <li><strong>SitHub:</strong> Единственный компонент, осуществляющий связь с серверами Провайдера, передаёт только данные, указанные в разделе 3.2, модуль сканирования изолирован от сетевых функций.</li>
              </ul>
              <p className="mb-4"><strong>2.3 Что это означает на практике:</strong> Провайдер не имеет технической возможности получить доступ к: Исходному коду, хранящемуся в Экосистеме, Результатам сканирования безопасности, Истории коммитов и изменений кода, Именам файлов и структуре проектов.</p>
            </section>

            <section id="information-collection">
              <h2 className="text-2xl font-semibold mb-4">3. Информация, которую мы собираем</h2>
              <p className="mb-4"><strong>3.1 Информация о подписке (обязательная):</strong> Название организации, контактный email, страна регистрации. Информация о лицензии: хеш лицензионного ключа, даты/статус подписки. Платёжная информация: Обрабатывается сторонними процессорами (мы храним только тип метода и последние 4 цифры).</p>
              <p className="mb-4"><strong>3.2 Технические данные от SitHub (автоматические):</strong> При проверке лицензии/обновлениях: Хеш лицензионного ключа, криптографический токен сессии, и Технические метаданные (Дата/время, версия SitHub, хеш Installation ID, IP-адрес).</p>
              <p className="mb-4"><strong>3.3 Техническая телеметрия (опциональная):</strong> Только при явном согласии: Информация об использовании (частота обновлений), Отчёты об ошибках (стек трейсы БЕЗ исходного кода). Фильтруется от конфиденциальных данных.</p>
              <p className="mb-4"><strong>3.4 Информация, которую мы НЕ собираем:</strong> Исходный код (репозитории, файлы), Результаты анализа (уязвимости, отчеты), Метаданные разработки (имена файлов, история), Информация о пользователях (имена, email разработчиков), Учётные данные (пароли, ключи).</p>
            </section>

            <section id="purposes">
              <h2 className="text-2xl font-semibold mb-4">4. Цели и правовые основания обработки</h2>
              <p className="mb-4"><strong>4.1 Управление подпиской:</strong> Предоставление доступа/обновлений. Основание: Исполнение договора.</p>
              <p className="mb-4"><strong>4.2 Доставка обновлений безопасности:</strong> Обеспечение актуальности баз уязвимостей. Основание: Исполнение договора.</p>
              <p className="mb-4"><strong>4.3 Улучшение качества услуг:</strong> Разработка баз данных безопасности. Основание: Согласие (для телеметрии).</p>
              <p className="mb-4"><strong>4.4 Соблюдение законодательства:</strong> Выполнение обязательств (налоги/учет). Основание: Юридическое обязательство.</p>
              <p className="mb-4"><strong>4.5 Предотвращение злоупотреблений:</strong> Защита от мошенничества. Основание: Законные интересы.</p>
            </section>

             <section id="storage-security">
              <h2 className="text-2xl font-semibold mb-4">5. Хранение и безопасность данных</h2>
              <p className="mb-4"><strong>5.1 Данные на серверах Провайдера:</strong> Инфо о подписке, Платёжные записи (7 лет), Хеши ключей, Логи запросов (90 дней). Локация: Республика Казахстан.</p>
              <p className="mb-4"><strong>5.2 Данные на инфраструктуре Пользователя:</strong> Весь исходный код, результаты сканирования, история коммитов. Пользователь обеспечивает хранение/бэкап.</p>
              <p className="mb-4"><strong>5.3 Меры технической безопасности:</strong> Шифрование (AES-256 в покое, TLS 1.3 при передаче, Bcrypt для ключей), Контроль доступа (MFA, минимум привилегий), Сетевая безопасность (Firewalls, IDS/IPS, DDoS-защита).</p>
              <p className="mb-4"><strong>5.5 Уведомление об инцидентах:</strong> Уведомление в течение 72 часов с момента обнаружения.</p>
            </section>

            <section id="transfer-disclosure">
              <h2 className="text-2xl font-semibold mb-4">6. Передача и раскрытие данных</h2>
              <p className="mb-4"><strong>6.1 Внутреннее использование:</strong> Доступ ограничен сотрудниками с соглашениями о конфиденциальности (Админы, Поддержка, Бухгалтерия).</p>
              <p className="mb-4"><strong>6.2 Сторонние обработчики:</strong> Платёжные процессоры (Stripe, PayPal, Kaspi), Хостинг-провайдеры, Службы мониторинга. Все подписывают DPA.</p>
              <p className="mb-4"><strong>6.3 Передача правоохранительным органам:</strong> Только при наличии юридического обязательства/ордера. Мы не можем предоставить исходный код, так как не храним его.</p>
            </section>

            <section id="international">
              <h2 className="text-2xl font-semibold mb-4">7. Международные передачи данных</h2>
              <p className="mb-4"><strong>7.1 Местонахождение серверов:</strong> Основные серверы: Республика Казахстан.</p>
              <p className="mb-4"><strong>7.2 Передачи из ЕС:</strong> Мы используем Стандартные договорные оговорки (SCC), утверждённые Еврокомиссией.</p>
              <p className="mb-4"><strong>7.3 Что передаётся:</strong> Инфо о подписке, Запросы обновлений. НЕ передаётся: Исходный код, Результаты сканирования.</p>
            </section>

            <section id="user-rights">
              <h2 className="text-2xl font-semibold mb-4">8. Права субъектов данных</h2>
              <p className="mb-4">Для всех пользователей (базовые права) и ЕС (GDPR). Права: Доступ, Исправление, Удаление («Право быть забытым»), Ограничение обработки, Переносимость, Возражение, Отзыв согласия.</p>
              <p className="mb-4">Реализация: Запрос на info@silence.codes. Сроки ответа: 30 дней (GDPR) или 15 дней (РК).</p>
            </section>

            <section id="cookies">
              <h2 className="text-2xl font-semibold mb-4">9. Файлы cookie и технологии отслеживания</h2>
              <p className="mb-4"><strong>9.1 Использование:</strong> Строго необходимые (Аутентификация, Язык, Безопасность), Аналитические (Опционально, анонимизировано). Мы НЕ используем сторонние трекеры или рекламные cookie.</p>
            </section>

            <section id="retention">
              <h2 className="text-2xl font-semibold mb-4">10. Хранение данных</h2>
              <p className="mb-4">Подписка/Ключи: Срок действия + 1 год. Платёжные записи: 7 лет. Логи: 90 дней. Телеметрия: 1 год. Ошибки: 2 года. Автоматическое удаление после истечения.</p>
            </section>

            <section id="children">
              <h2 className="text-2xl font-semibold mb-4">11. Конфиденциальность детей</h2>
              <p className="mb-4">Не предназначено для лиц младше 18 лет. 16-18 лет – с согласия родителей. Мы сознательно не собираем данные лиц младше 16 лет.</p>
            </section>

            <section id="responsibilities">
              <h2 className="text-2xl font-semibold mb-4">12. Ваши обязанности по защите данных</h2>
              <p className="mb-4">Вы отвечаете за Безопасность инфраструктуры (Файрволы, Обновления), Предотвращение ручной передачи, Управление пользователями. Провайдер не несёт ответственности за утечки по вине пользователя.</p>
            </section>

             <section id="transparency">
              <h2 className="text-2xl font-semibold mb-4">13. Отчёт о прозрачности</h2>
              <p className="mb-4">Провайдер привержен прозрачности в отношении запросов органов и инцидентов. Уведомление об инцидентах в течение 72 часов.</p>
            </section>

            <section id="dpa">
              <h2 className="text-2xl font-semibold mb-4">14. Соглашение об обработке (DPA)</h2>
              <p className="mb-4">Доступно для корпоративных клиентов из ЕС. Включает SCC. За запрос на info@silence.codes.</p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold mb-4">15. Изменения в Политике</h2>
              <p className="mb-4">Провайдер может изменять политику. О существенных изменениях уведомляем за 30 дней. Продолжение использования означает согласие.</p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-semibold mb-4">16. Контактная информация</h2>
              <p className="mb-4">Email: info@silence.codes</p>
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
