"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import PolicySidebar from '@/components/PolicySidebar';
import BackToTopButton from '@/components/BackToTopButton';
import Modal from '@/components/Modal';

const TermsOfServiceSLNC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    document.title = currentLang === 'ru' ? 'Политики SLNC-env' : 'SLNC-env Policies';
  }, [currentLang]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const content = {
    en: {
      mainTitle: "SLNC-env Terms of Service",
      subTitle: "Terms of Service",
      sections: [
        { id: 'definitions', title: '1. Definitions and Parties' },
        { id: 'consent', title: '2. Consent and Legal Force' },
        { id: 'description', title: '3. Ecosystem Description' },
        { id: 'guarantees', title: '4. Security Guarantees' },
        { id: 'subscription', title: '5. Subscription and Payment' },
        { id: 'sla', title: '6. Service Level Agreement' },
        { id: 'ip', title: '7. Intellectual Property' },
        { id: 'liability', title: '8. Limitation of Liability' },
        { id: 'termination', title: '9. Termination' },
        { id: 'acceptable-use', title: '10. Acceptable Use' },
        { id: 'compliance', title: '11. Compliance' },
        { id: 'law', title: '12. Applicable Law' },
        { id: 'changes', title: '13. Changes to Terms' },
        { id: 'misc', title: '14. Miscellaneous' },
        { id: 'contact', title: '15. Contact' },
        { id: 'download', title: 'Download Full Terms' },
      ],
      download: {
        title: "Full Terms of Service",
        desc: "The detailed Terms of Service for SLNC-env are available for download below.",
        button: "Download Full Terms of Service (DOCX)",
        link: "/docs/Terms_of_Service_SLNC_env.docx"
      }
    },
    ru: {
      mainTitle: "Условия предоставления услуг SLNC-env",
      subTitle: "Условия предоставления услуг",
      sections: [
        { id: 'definitions', title: '1. Определения и стороны' },
        { id: 'consent', title: '2. Согласие и юридическая сила' },
        { id: 'description', title: '3. Описание экосистемы' },
        { id: 'guarantees', title: '4. Гарантии безопасности' },
        { id: 'subscription', title: '5. Подписка и оплата' },
        { id: 'sla', title: '6. Соглашение об уровне обслуживания' },
        { id: 'ip', title: '7. Интеллектуальная собственность' },
        { id: 'liability', title: '8. Ограничение ответственности' },
        { id: 'termination', title: '9. Прекращение' },
        { id: 'acceptable-use', title: '10. Допустимое использование' },
        { id: 'compliance', title: '11. Соответствие требованиям' },
        { id: 'law', title: '12. Применимое право' },
        { id: 'changes', title: '13. Изменения условий' },
        { id: 'misc', title: '14. Прочие положения' },
        { id: 'contact', title: '15. Контакты' },
        { id: 'download', title: 'Скачать полные условия' },
      ],
      download: {
        title: "Полный текст Условий предоставления услуг",
        desc: "Подробные Условия предоставления услуг SLNC-env доступны для скачивания ниже.",
        button: "Скачать Условия предоставления услуг (DOCX)",
        link: "/docs/ru/Условия_предоставления_услуг_Silence_environment.docx"
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
                <section id="definitions">
                  <h2 className="text-2xl font-semibold mb-4">1. Definitions and Parties</h2>
                  <p className="mb-4"><strong>1.1 Parties:</strong> Silence AI ("Provider") and User/Client ("You").</p>
                  <p className="mb-4"><strong>1.2 Ecosystem:</strong> "Silence Environment" (SLNC-env) includes Ollama + LLM (local AI), SLNC-Code (autonomous IDE), and SitHub (private repository manager).</p>
                </section>

                <section id="consent">
                  <h2 className="text-2xl font-semibold mb-4">2. Consent and Legal Force</h2>
                  <p className="mb-4">By subscribing/using, you agree to these Terms. Age restrictions: 18+ (or 16-18 with parental consent). Corporate use requires authority to bind organization.</p>
                </section>

                <section id="description">
                  <h2 className="text-2xl font-semibold mb-4">3. Ecosystem Description and Operating Principles</h2>
                  <p className="mb-4"><strong>3.1 Principle:</strong> "Privacy by Design". Local processing without source code transfer.</p>
                  <p className="mb-4"><strong>3.2 Components:</strong> Ollama & SLNC-Code are fully autonomous. SitHub scans locally using Trivy and only communicates with Provider for security updates (receiving definitions) and license verification.</p>
                  <p className="mb-4"><strong>3.3 Security Updates:</strong> SitHub downloads vulnerability databases. Outgoing data is limited to license tokens, hashes, and metadata. Source Code is NEVER transmitted.</p>
                </section>

                <section id="guarantees">
                  <h2 className="text-2xl font-semibold mb-4">4. Data Security Guarantees</h2>
                  <p className="mb-4">Provider guarantees Ecosystem is designed for local processing. Provider does NOT guarantee against user actions, infrastructure compromise, or manual transfer.</p>
                  <p className="mb-4">User Obligations: Maintain firewall/security, Prevent manual data transfer, Configure updates.</p>
                </section>

                <section id="subscription">
                  <h2 className="text-2xl font-semibold mb-4">5. Subscription and Payment</h2>
                  <p className="mb-4">Annual subscription for full access and updates. Payment in advance. Auto-renewal unless canceled (notification 30 days prior). No refunds except for critical system failure (&gt;7 days), proven privacy breach, or regulatory requirements (EU 14-day withdrawal).</p>
                </section>

                <section id="sla">
                  <h2 className="text-2xl font-semibold mb-4">6. Service Level Agreement (SLA)</h2>
                  <p className="mb-4">Target: 99.5% uptime for update servers. Local components (Ollama, SLNC-Code, SitHub scanning) operate independently of servers. Regular updates provided weekly; Critical updates within 48 hours.</p>
                </section>

                <section id="ip">
                  <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
                  <p className="mb-4"><strong>User Rights:</strong> Retains full rights to their code. Provider claims no ownership/license.</p>
                  <p className="mb-4"><strong>Provider Rights:</strong> Retains rights to Ecosystem code/algorithms. User gets non-exclusive, non-transferable license.</p>
                  <p className="mb-4"><strong>Restrictions:</strong> No reverse engineering, distribution, or reselling.</p>
                </section>

                <section id="liability">
                  <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
                  <p className="mb-4">Provided "AS IS". Provider not liable for user-side problems, scan accuracy (false positives/negatives), or indirect damages. Liability limited to amount paid in preceding 12 months.</p>
                </section>

                <section id="termination">
                  <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
                  <p className="mb-4">User can cancel anytime. Provider can terminate for breach (14 days to remedy). Upon termination, access to updates ceases; local components remain but stop updating.</p>
                </section>

                <section id="acceptable-use">
                  <h2 className="text-2xl font-semibold mb-4">10. Acceptable Use</h2>
                  <p className="mb-4">Permitted: Development, Analysis, Training. Prohibited: Reverse engineering, Distribution to third parties, Illegal use, Malware development.</p>
                </section>

                <section id="compliance">
                  <h2 className="text-2xl font-semibold mb-4">11. Compliance</h2>
                  <p className="mb-4">Compliance with Export Control (Sanctions). GDPR compliance for EU users (SCCs for data transfer). Data Retention as per law.</p>
                </section>

                <section id="law">
                  <h2 className="text-2xl font-semibold mb-4">12. Applicable Law and Dispute Resolution</h2>
                  <p className="mb-4">Governed by laws of Republic of Kazakhstan. Disputes resolved via negotiation or arbitration (Astana). EU consumers have rights to local courts.</p>
                </section>

                <section id="changes">
                  <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
                  <p className="mb-4">Provider may change terms. Material changes notified 30 days in advance.</p>
                </section>

                <section id="misc">
                  <h2 className="text-2xl font-semibold mb-4">14. Miscellaneous</h2>
                  <p className="mb-4">Severability, Waiver of Rights, Independent Contractors.</p>
                </section>

                <section id="contact">
                  <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
                  <p className="mb-4">Email: info@silence.codes</p>
                </section>
              </>
            ) : (
              <>
                <section id="definitions">
                  <h2 className="text-2xl font-semibold mb-4">1. Определения и стороны</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">1.1 Определение сторон</h3>
                  <p className="mb-4">Настоящие Условия предоставления услуг (далее — «Условия») заключаются между:</p>
                  <p className="mb-4"><strong>Провайдером:</strong> Silence AI (далее — «Провайдер», «мы», «нас», «наш»), юридическое лицо, зарегистрированное в соответствии с законодательством Республики Казахстан, предоставляющее программное обеспечение и услуги, описанные в настоящих Условиях.</p>
                  <p className="mb-4"><strong>Пользователем:</strong> Физическое или юридическое лицо (далее — «Пользователь», «вы», «ваш», «Клиент»), которое подписывается на услуги, загружает, устанавливает или использует Экосистему.</p>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">1.2 Определение Экосистемы</h3>
                  <p className="mb-4">«Silence Environment» (далее — «Экосистема») — локальная платформа программирования с поддержкой искусственного интеллекта, предназначенная для развертывания в изолированной инфраструктуре Пользователя. Экосистема включает следующие компоненты:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Ollama + LLM</strong> — локальная языковая модель искусственного интеллекта</li>
                    <li><strong>SLNC-Code</strong> — автономная среда разработки с поддержкой ИИ</li>
                    <li><strong>SitHub</strong> — частная платформа управления репозиториями с функциями сканирования безопасности</li>
                  </ul>
                  <p className="mb-4">(далее совместно именуемые — «Компоненты»)</p>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">1.3 Ключевые термины</h3>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>«Исходный код»</strong> — программный код, создаваемый, хранимый или обрабатываемый Пользователем с использованием Экосистемы</li>
                    <li><strong>«Локальная инфраструктура»</strong> — серверы, рабочие станции и сетевое оборудование, принадлежащее или контролируемое Пользователем, на которых развертывается Экосистема</li>
                    <li><strong>«Корпоративный периметр»</strong> — границы сетевой инфраструктуры Пользователя, определяемые межсетевыми экранами и другими средствами сетевой безопасности</li>
                    <li><strong>«Обновления безопасности»</strong> — базы данных уязвимостей, патчи безопасности и метаданные угроз, передаваемые Провайдером Пользователю</li>
                  </ul>
                </section>

                <section id="consent">
                  <h2 className="text-2xl font-semibold mb-4">2. Согласие и юридическая сила</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Принятие Условий</h3>
                  <p className="mb-4">Подписываясь на услуги, загружая, устанавливая или используя Экосистему или любой из её Компонентов, вы подтверждаете, что:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Прочитали и поняли настоящие Условия</li>
                    <li>Соглашаетесь соблюдать настоящие Условия в полном объёме</li>
                    <li>Обладаете юридическими полномочиями для заключения настоящего соглашения</li>
                  </ul>
                  <p className="mb-4"><strong>Если вы не согласны с настоящими Условиями, вы не имеете права использовать Экосистему.</strong></p>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Возрастные ограничения</h3>
                  <p className="mb-4">Для использования Экосистемы:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Вам должно быть не менее 18 лет для самостоятельного использования</li>
                    <li>Если вам от 16 до 18 лет, вы должны получить письменное согласие родителя или законного опекуна</li>
                    <li>Лицам младше 16 лет использование Экосистемы запрещено</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Корпоративное использование</h3>
                  <p className="mb-4">При использовании от имени организации вы подтверждаете наличие полномочий для заключения настоящего соглашения от имени такой организации.</p>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">2.4 Связанные документы</h3>
                  <p className="mb-4">Настоящие Условия дополняются следующими документами, которые являются их неотъемлемой частью:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Политика конфиденциальности</li>
                    <li>Техническая документация по архитектуре безопасности</li>
                  </ul>
                </section>

                <section id="description">
                  <h2 className="text-2xl font-semibold mb-4">3. Описание экосистемы и принципы работы</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">3.1 Архитектурный принцип: Локальная обработка</h3>
                  <p className="mb-4">Экосистема спроектирована на основе принципа «Privacy by Design» (конфиденциальность по замыслу). Все Компоненты работают исключительно на локальной инфраструктуре Пользователя без передачи исходного кода на внешние серверы.</p>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Компоненты Экосистемы</h3>
                  <p className="mb-4"><strong>3.2.1 Ollama + LLM</strong></p>
                  <p className="mb-2">Языковая модель искусственного интеллекта, работающая локально:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Выполняет обработку на оборудовании Пользователя</li>
                    <li>Не требует подключения к интернету для функционирования</li>
                    <li>Не передаёт данные на серверы Провайдера</li>
                    <li>Является полностью автономным компонентом</li>
                  </ul>
                  
                  <p className="mb-4"><strong>3.2.2 SLNC-Code</strong></p>
                  <p className="mb-2">Автономная среда разработки с поддержкой ИИ:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Работает полностью на локальной инфраструктуре</li>
                    <li>Не осуществляет передачу данных во внешние облачные сервисы</li>
                    <li>Интегрируется с локальной LLM (Ollama)</li>
                    <li>Является полностью автономным компонентом</li>
                  </ul>
                  
                  <p className="mb-4"><strong>3.2.3 SitHub</strong></p>
                  <p className="mb-2">Частная платформа управления репозиториями:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Хранит репозитории на локальной инфраструктуре Пользователя</li>
                    <li>Выполняет сканирование безопасности локально с использованием Trivy</li>
                    <li>Единственный компонент, который осуществляет связь с серверами Провайдера</li>
                    <li>Получает обновления безопасности с серверов Провайдера</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">3.3 Служба обновлений безопасности (только для SitHub)</h3>
                  <p className="mb-4"><strong>3.3.1 Назначение службы</strong></p>
                  <p className="mb-4">SitHub использует базы данных уязвимостей для сканирования кода Пользователя на наличие известных угроз безопасности. Для обеспечения актуальности этих баз данных SitHub загружает обновления с серверов Провайдера.</p>
                  
                  <p className="mb-4"><strong>3.3.2 Что передаётся С серверов Провайдера К Пользователю</strong></p>
                  <p className="mb-2">Входящий поток данных (с серверов Провайдера на инфраструктуру Пользователя):</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Базы данных уязвимостей (CVE, информация о вредоносных пакетах)</li>
                    <li>Патчи безопасности и инструкции по устранению уязвимостей</li>
                    <li>Метаданные безопасности пакетов (npm, PyPI, Maven и др.)</li>
                    <li>Сигнатуры вредоносного кода</li>
                    <li>Обновления компонентов Trivy</li>
                  </ul>
                  
                  <p className="mb-4"><strong>3.3.3 Что передаётся ОТ Пользователя К серверам Провайдера</strong></p>
                  <p className="mb-2">Исходящий поток данных (с инфраструктуры Пользователя на серверы Провайдера):</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Токены проверки лицензии — криптографические токены для подтверждения действительности подписки</li>
                    <li>Хеш лицензионного ключа — для аутентификации запросов обновлений</li>
                    <li>Метаданные запросов обновлений: временная метка запроса, версия установленного SitHub, хеш идентификатора установки (необратимый)</li>
                  </ul>
                  
                  <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 mb-4">
                    <p className="font-bold text-red-400 mb-2">КРИТИЧЕСКИ ВАЖНО:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Исходный код Пользователя <strong>НИКОГДА</strong> не передаётся на серверы Провайдера</li>
                      <li>Результаты сканирования безопасности <strong>НИКОГДА</strong> не передаются на серверы Провайдера</li>
                      <li>Имена файлов, структура проекта, метаданные репозиториев <strong>НИКОГДА</strong> не передаются</li>
                      <li>Информация о разработчиках и пользователях <strong>НИКОГДА</strong> не передаётся</li>
                    </ul>
                  </div>
                  
                  <p className="mb-4"><strong>3.3.4 Техническая реализация гарантии изоляции кода</strong></p>
                  <p className="mb-2">Архитектура SitHub обеспечивает структурную невозможность передачи исходного кода:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Модуль сканирования (Trivy engine) работает в изолированном процессе без сетевого доступа</li>
                    <li>Модуль обновлений имеет доступ только к каталогу баз данных</li>
                    <li>Сетевой модуль реализован по принципу «write-only» для обновлений (только загрузка, без отправки данных)</li>
                    <li>Отсутствие API-методов для передачи исходного кода на внешние серверы</li>
                  </ul>
                  
                  <p className="mb-4"><strong>3.3.5 Изоляция других компонентов</strong></p>
                  <p className="mb-4">Ollama + LLM и SLNC-Code <strong>НЕ</strong> осуществляют связь с серверами Провайдера ни при каких обстоятельствах. Эти компоненты являются полностью автономными.</p>
                </section>

                <section id="guarantees">
                  <h2 className="text-2xl font-semibold mb-4">4. Гарантии и ограничения ответственности по безопасности данных</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Гарантии Провайдера</h3>
                  <p className="mb-4"><strong>4.1.1 Архитектурная гарантия</strong></p>
                  <p className="mb-2">Провайдер гарантирует, что Экосистема спроектирована таким образом, что:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Исходный код Пользователя обрабатывается исключительно на локальной инфраструктуре</li>
                    <li>Компоненты Ollama + LLM и SLNC-Code не содержат функций передачи данных на внешние серверы</li>
                    <li>SitHub передаёт только данные, указанные в разделе 3.3.3, и не содержит функций передачи исходного кода</li>
                  </ul>
                  
                  <p className="mb-4"><strong>4.1.2 Ограничения гарантии</strong></p>
                  <p className="mb-2">Провайдер <strong>НЕ</strong> гарантирует защиту от:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Действий самого Пользователя по передаче кода во внешние сервисы</li>
                    <li>Компрометации инфраструктуры Пользователя третьими лицами</li>
                    <li>Ошибок конфигурации сетевой безопасности на стороне Пользователя</li>
                    <li>Действий сотрудников или подрядчиков Пользователя</li>
                  </ul>
                  
                  <p className="mb-4"><strong>4.1.3 Формулировка гарантии без абсолютных обещаний</strong></p>
                  <p className="mb-2">Провайдер обязуется:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Не собирать и не передавать исходный код Пользователя при нормальной работе Экосистемы</li>
                    <li>Не использовать код Пользователя для обучения моделей или иных целей</li>
                    <li>Незамедлительно уведомлять Пользователя о любых инцидентах безопасности</li>
                  </ul>
                  <p className="mb-4"><strong>ВАЖНО:</strong> Данная гарантия действует при условии правильной эксплуатации Экосистемы в соответствии с технической документацией.</p>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Обязанности Пользователя</h3>
                  <p className="mb-4"><strong>4.2.1 Обеспечение безопасности инфраструктуры</strong></p>
                  <p className="mb-2">Пользователь обязуется:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Поддерживать надлежащую конфигурацию межсетевых экранов</li>
                    <li>Внедрять контроль доступа к локальным системам</li>
                    <li>Обеспечивать физическую и сетевую безопасность серверов</li>
                    <li>Регулярно обновлять операционные системы и средства защиты</li>
                  </ul>
                  
                  <p className="mb-4"><strong>4.2.2 Предотвращение ручной передачи данных</strong></p>
                  <p className="mb-2">Пользователь обязуется:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Не загружать исходный код вручную во внешние облачные сервисы</li>
                    <li>Обучать разработчиков принципам безопасной работы с Экосистемой</li>
                    <li>Контролировать действия пользователей с привилегированным доступом</li>
                  </ul>
                  
                  <p className="mb-4"><strong>4.2.3 Конфигурация обновлений</strong></p>
                  <p className="mb-2">Пользователь несёт ответственность за:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Настройку SitHub для получения обновлений безопасности</li>
                    <li>Своевременное применение критических обновлений</li>
                    <li>Проверку работоспособности служб обновлений</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">4.3 Распределение ответственности</h3>
                  <div className="overflow-x-auto mb-4">
                    <table className="min-w-full border border-gray-600">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 px-4 py-2 text-left">Область</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Ответственность Провайдера</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Ответственность Пользователя</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Архитектура Экосистемы</td>
                          <td className="border border-gray-600 px-4 py-2">Гарантия локальной обработки</td>
                          <td className="border border-gray-600 px-4 py-2">—</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Исходный код компонентов</td>
                          <td className="border border-gray-600 px-4 py-2">Отсутствие функций передачи кода</td>
                          <td className="border border-gray-600 px-4 py-2">—</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Обновления безопасности</td>
                          <td className="border border-gray-600 px-4 py-2">Своевременная доставка</td>
                          <td className="border border-gray-600 px-4 py-2">Настройка получения</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Локальная инфраструктура</td>
                          <td className="border border-gray-600 px-4 py-2">—</td>
                          <td className="border border-gray-600 px-4 py-2">Безопасность и доступность</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Действия пользователей</td>
                          <td className="border border-gray-600 px-4 py-2">—</td>
                          <td className="border border-gray-600 px-4 py-2">Обучение и контроль</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Сетевая безопасность</td>
                          <td className="border border-gray-600 px-4 py-2">—</td>
                          <td className="border border-gray-600 px-4 py-2">Конфигурация периметра</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">4.4 Право на аудит</h3>
                  <p className="mb-4"><strong>4.4.1 Аудит со стороны Пользователя</strong></p>
                  <p className="mb-2">Пользователь имеет право:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Проводить анализ сетевого трафика Экосистемы</li>
                    <li>Запрашивать техническую документацию по архитектуре безопасности</li>
                    <li>Проводить анализ исходного кода открытых компонентов SitHub</li>
                  </ul>
                  
                  <p className="mb-4"><strong>4.4.2 Аудит со стороны Провайдера</strong></p>
                  <p className="mb-2">Провайдер обязуется:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Ежегодно проводить независимый аудит безопасности Экосистемы</li>
                    <li>Публиковать сводные отчёты об аудите (без раскрытия конфиденциальной информации)</li>
                    <li>Уведомлять Пользователей о результатах критических аудитов</li>
                  </ul>
                </section>

                <section id="subscription">
                  <h2 className="text-2xl font-semibold mb-4">5. Подписка и оплата</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">5.1 Модель подписки</h3>
                  <p className="mb-4"><strong>5.1.1 Годовая подписка</strong></p>
                  <p className="mb-2">Экосистема предоставляется на основе годовой подписки, включающей:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Полный доступ ко всем Компонентам Экосистемы</li>
                    <li>Все функции и возможности без ограничений</li>
                    <li>Регулярные обновления баз данных безопасности</li>
                    <li>Техническую поддержку в соответствии с SLA</li>
                  </ul>
                  <p className="mb-4">Подписка действует в течение 12 месяцев с даты активации.</p>
                  
                  <p className="mb-4"><strong>5.1.2 Стоимость и оплата</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Актуальная стоимость подписки указывается на веб-сайте www.silence.codes/slnc-env</li>
                    <li>Оплата производится ежегодно авансом</li>
                    <li>Принимаются безналичные платежи в соответствии с законодательством Республики Казахстан</li>
                    <li>Для международных клиентов доступны международные платёжные методы</li>
                  </ul>
                  
                  <p className="mb-4"><strong>5.1.3 Налоги</strong></p>
                  <p className="mb-4">Указанная стоимость не включает применимые налоги (НДС, налог с продаж и т.д.). Пользователь несёт ответственность за уплату всех применимых налогов в своей юрисдикции.</p>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Продление и отмена</h3>
                  <p className="mb-4"><strong>5.2.1 Автоматическое продление</strong></p>
                  <p className="mb-2">Если Пользователь не отменит подписку до окончания периода действия:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Подписка автоматически продлевается на следующий год</li>
                    <li>Оплата списывается с использованием сохранённого платёжного метода</li>
                    <li>Пользователь получает уведомление за 30 дней до продления</li>
                  </ul>
                  
                  <p className="mb-4"><strong>5.2.2 Отмена подписки</strong></p>
                  <p className="mb-2">Пользователь может отменить подписку в любое время:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Подписка остаётся активной до конца оплаченного периода</li>
                    <li>Автоматическое продление не произойдёт</li>
                    <li>Доступ к обновлениям прекращается после истечения периода</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">5.3 Политика возврата средств</h3>
                  <p className="mb-4"><strong>5.3.1 Основное правило</strong></p>
                  <p className="mb-4">Оплаченные средства за подписку не возвращаются, за исключением случаев, указанных ниже.</p>
                  
                  <p className="mb-4"><strong>5.3.2 Исключения — возврат средств предоставляется</strong></p>
                  <p className="mb-2">Полный или частичный возврат средств возможен в следующих случаях:</p>
                  <p className="mb-2"><strong>a) Критический сбой системы:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Экосистема полностью не функционирует более 7 дней подряд</li>
                    <li>Проблема возникла по вине Провайдера</li>
                    <li>Проблема не может быть устранена в разумные сроки</li>
                  </ul>
                  <p className="mb-2"><strong>b) Нарушение гарантий конфиденциальности:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Доказанная передача исходного кода на серверы Провайдера вопреки гарантиям</li>
                    <li>Инцидент безопасности по вине Провайдера, приведший к утечке данных</li>
                  </ul>
                  <p className="mb-2"><strong>c) Нормативные требования:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Когда возврат средств требуется законодательством юрисдикции Пользователя</li>
                    <li>В соответствии с правами потребителей</li>
                  </ul>
                  
                  <p className="mb-4"><strong>5.3.3 Права потребителей в Европейском Союзе</strong></p>
                  <p className="mb-2">Для Пользователей, находящихся в Европейском Союзе, действуют следующие права:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>14-дневное право на отказ — Пользователь может отменить подписку в течение 14 дней с момента заключения договора</li>
                    <li>Возврат полной стоимости (за вычетом пропорциональной стоимости использованных услуг)</li>
                    <li>Право действует даже после начала использования Экосистемы</li>
                  </ul>
                  
                  <p className="mb-4"><strong>5.3.4 Процедура возврата средств</strong></p>
                  <p className="mb-2">Для запроса возврата средств:</p>
                  <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li>Отправьте заявление на адрес: info@silence.codes</li>
                    <li>Укажите причину возврата и подтверждающие документы</li>
                    <li>Провайдер рассмотрит запрос в течение 14 рабочих дней</li>
                    <li>При одобрении средства возвращаются в течение 30 дней</li>
                  </ol>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">5.4 Проверка лицензии</h3>
                  <p className="mb-4"><strong>5.4.1 Информация о лицензии</strong></p>
                  <p className="mb-2">Провайдер хранит следующую информацию о лицензии:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Хеш лицензионного ключа (необратимый)</li>
                    <li>Дата активации и истечения подписки</li>
                    <li>Статус подписки (активна/неактивна)</li>
                    <li>Название организации Пользователя (для корпоративных подписок)</li>
                  </ul>
                  
                  <p className="mb-4"><strong>5.4.2 Что НЕ хранится</strong></p>
                  <p className="mb-2">Провайдер <strong>НЕ</strong> хранит:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Исходный код или данные разработки</li>
                    <li>Информацию о разработчиках и структуре команды</li>
                    <li>Результаты сканирования безопасности</li>
                    <li>Метаданные репозиториев</li>
                  </ul>
                  
                  <p className="mb-4"><strong>5.4.3 Механизм проверки</strong></p>
                  <p className="mb-2">SitHub периодически проверяет действительность лицензии, отправляя хеш лицензионного ключа на серверы Провайдера. Проверка происходит:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>При запуске SitHub</li>
                    <li>При запросе обновлений безопасности</li>
                    <li>Не чаще одного раза в 24 часа</li>
                  </ul>
                </section>

                <section id="sla">
                  <h2 className="text-2xl font-semibold mb-4">6. Уровень обслуживания (SLA)</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">6.1 Доступность серверов обновлений</h3>
                  <p className="mb-4"><strong>6.1.1 Целевые показатели</strong></p>
                  <p className="mb-2">Провайдер стремится обеспечить:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>99,5% времени безотказной работы серверов обновлений в год</li>
                    <li>Это эквивалентно не более 43,8 часам простоя в год</li>
                  </ul>
                  
                  <p className="mb-4"><strong>6.1.2 Расчёт времени безотказной работы</strong></p>
                  <p className="mb-2">Исключения из расчёта простоя:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Плановое обслуживание, уведомленное за 72 часа</li>
                    <li>Обстоятельства непреодолимой силы (форс-мажор)</li>
                    <li>Проблемы на стороне инфраструктуры Пользователя</li>
                    <li>Проблемы с интернет-провайдерами третьих сторон</li>
                  </ul>
                  
                  <p className="mb-4"><strong>6.1.3 Важное уточнение</strong></p>
                  <p className="mb-4">Показатель 99,5% является целевым, но не гарантированным. Провайдер не несёт финансовой ответственности за невыполнение этого показателя, за исключением случаев длительного (более 7 дней подряд) полного отказа службы.</p>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">6.2 Работа локальных компонентов</h3>
                  <p className="mb-4"><strong>6.2.1 Независимость от серверов</strong></p>
                  <p className="mb-2">Следующие компоненты продолжают работать независимо от доступности серверов Провайдера:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Ollama + LLM — полностью автономна</li>
                    <li>SLNC-Code — полностью автономна</li>
                    <li>SitHub — сканирование и управление репозиториями продолжается с использованием последних загруженных баз данных</li>
                  </ul>
                  
                  <p className="mb-4"><strong>6.2.2 Деградация функциональности</strong></p>
                  <p className="mb-2">При недоступности серверов обновлений:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Все функции Экосистемы продолжают работать</li>
                    <li>SitHub использует последнюю загруженную базу данных уязвимостей</li>
                    <li>Обнаружение новых уязвимостей ограничено информацией в последней базе данных</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">6.3 Обновления безопасности</h3>
                  <p className="mb-4"><strong>6.3.1 Регулярные обновления</strong></p>
                  <p className="mb-2">Провайдер предоставляет:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Обновления баз данных уязвимостей не реже одного раза в неделю</li>
                    <li>Внеплановые обновления при обнаружении критических угроз</li>
                  </ul>
                  
                  <p className="mb-4"><strong>6.3.2 Критические обновления</strong></p>
                  <p className="mb-2">При обнаружении критических уязвимостей (CVSS 9.0+):</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Обновление выпускается в течение 48 часов с момента публичного раскрытия</li>
                    <li>Пользователи получают уведомление о необходимости обновления</li>
                    <li>Рекомендация по немедленному применению обновления</li>
                  </ul>
                  
                  <p className="mb-4"><strong>6.3.3 Ответственность за применение</strong></p>
                  <p className="mb-2">Пользователь несёт ответственность за:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Настройку SitHub для автоматической загрузки обновлений</li>
                    <li>Своевременное применение критических обновлений</li>
                    <li>Мониторинг статуса обновлений</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">6.4 Техническая поддержка</h3>
                  <p className="mb-4"><strong>6.4.1 Каналы поддержки</strong></p>
                  <p className="mb-2">Провайдер предоставляет техническую поддержку через:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Email: info@silence.codes</li>
                    <li>Система тикетов (для корпоративных клиентов)</li>
                  </ul>
                  
                  <p className="mb-4"><strong>6.4.2 Время ответа</strong></p>
                  <div className="overflow-x-auto mb-4">
                    <table className="min-w-full border border-gray-600">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 px-4 py-2 text-left">Приоритет</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Описание</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Время первого ответа</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Критический</td>
                          <td className="border border-gray-600 px-4 py-2">Полный отказ Экосистемы</td>
                          <td className="border border-gray-600 px-4 py-2">4 часа</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Высокий</td>
                          <td className="border border-gray-600 px-4 py-2">Существенное снижение функциональности</td>
                          <td className="border border-gray-600 px-4 py-2">12 часов</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Средний</td>
                          <td className="border border-gray-600 px-4 py-2">Ограниченное влияние на работу</td>
                          <td className="border border-gray-600 px-4 py-2">48 часов</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Низкий</td>
                          <td className="border border-gray-600 px-4 py-2">Общие вопросы, запросы функций</td>
                          <td className="border border-gray-600 px-4 py-2">5 рабочих дней</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <p className="mb-4"><strong>6.4.3 Часы работы поддержки</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Поддержка доступна с понедельника по пятницу, 09:00-17:00 (GMT+6, Астана)</li>
                    <li>Критические инциденты обрабатываются 24/7</li>
                  </ul>
                </section>

                <section id="ip">
                  <h2 className="text-2xl font-semibold mb-4">7. Интеллектуальная собственность</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">7.1 Права Пользователя на свой код</h3>
                  <p className="mb-4"><strong>7.1.1 Сохранение всех прав</strong></p>
                  <p className="mb-2">Пользователь сохраняет полные и исключительные права на:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Весь исходный код, созданный с использованием Экосистемы</li>
                    <li>Все производные работы и модификации</li>
                    <li>Все связанные авторские права, патенты и коммерческую тайну</li>
                    <li>Все права на коммерциализацию и распространение</li>
                  </ul>
                  
                  <p className="mb-4"><strong>7.1.2 Отсутствие претензий Провайдера</strong></p>
                  <p className="mb-2">Провайдер:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Не претендует на владение кодом Пользователя</li>
                    <li>Не претендует на лицензию на использование кода</li>
                    <li>Не получает права на производные работы</li>
                    <li><strong>НИКОГДА</strong> не использует код Пользователя для обучения моделей ИИ или иных целей</li>
                  </ul>
                  
                  <p className="mb-4"><strong>7.1.3 Юридическое подтверждение</strong></p>
                  <p className="mb-2">Использование Экосистемы не создаёт и не подразумевает:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Передачу прав интеллектуальной собственности Провайдеру</li>
                    <li>Лицензию на использование кода Провайдером</li>
                    <li>Обязательство по раскрытию кода третьим лицам</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">7.2 Права Провайдера на Экосистему</h3>
                  <p className="mb-4"><strong>7.2.1 Собственность Провайдера</strong></p>
                  <p className="mb-2">Провайдер сохраняет все права на:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Исходный код всех Компонентов Экосистемы</li>
                    <li>Алгоритмы и методологии, реализованные в Экосистеме</li>
                    <li>Базы данных уязвимостей и обновления безопасности</li>
                    <li>Торговые марки, логотипы и фирменную символику</li>
                    <li>Техническую документацию и руководства пользователя</li>
                  </ul>
                  
                  <p className="mb-4"><strong>7.2.2 Открытый исходный код</strong></p>
                  <p className="mb-2">Некоторые компоненты SitHub основаны на программном обеспечении с открытым исходным кодом:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Такие компоненты предоставляются в соответствии с их оригинальными лицензиями</li>
                    <li>Список компонентов и лицензий доступен в технической документации</li>
                    <li>Модификации open-source компонентов, сделанные Провайдером, остаются собственностью Провайдера (если это разрешено оригинальной лицензией)</li>
                  </ul>
                  
                  <p className="mb-4"><strong>7.2.3 Лицензия на использование</strong></p>
                  <p className="mb-2">Приобретая подписку, Пользователь получает:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Неисключительную лицензию на использование Экосистемы</li>
                    <li>Непередаваемую лицензию (без права сублицензирования)</li>
                    <li>Ограниченную сроком подписки лицензию</li>
                    <li>Лицензию с правом использования на локальной инфраструктуре Пользователя</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">7.3 Ограничения использования</h3>
                  <p className="mb-2">Пользователь <strong>НЕ</strong> имеет права:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Проводить обратную разработку проприетарных компонентов Экосистемы</li>
                    <li>Распространять или перепродавать Экосистему третьим лицам</li>
                    <li>Удалять или изменять уведомления об авторских правах</li>
                    <li>Создавать конкурирующие продукты на основе Экосистемы</li>
                    <li>Распространять базы данных уязвимостей, предоставленные Провайдером</li>
                  </ul>
                  <p className="mb-4"><strong>Исключение:</strong> Анализ сетевого трафика и проверка безопасности для целей аудита разрешены.</p>
                </section>

                <section id="liability">
                  <h2 className="text-2xl font-semibold mb-4">8. Ограничение ответственности</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">8.1 Предоставление «КАК ЕСТЬ»</h3>
                  <p className="mb-4"><strong>8.1.1 Отказ от гарантий</strong></p>
                  <p className="mb-2">В МАКСИМАЛЬНОЙ СТЕПЕНИ, РАЗРЕШЁННОЙ ПРИМЕНИМЫМ ЗАКОНОДАТЕЛЬСТВОМ:</p>
                  <p className="mb-2">Экосистема предоставляется «КАК ЕСТЬ» и «КАК ДОСТУПНО», без каких-либо гарантий, явных или подразумеваемых, включая, но не ограничиваясь:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Гарантиями товарной пригодности</li>
                    <li>Гарантиями пригодности для определённой цели</li>
                    <li>Гарантиями отсутствия нарушения прав третьих лиц</li>
                    <li>Гарантиями точности, надёжности или полноты функций</li>
                  </ul>
                  
                  <p className="mb-4"><strong>8.1.2 Ограничения применимости</strong></p>
                  <p className="mb-2">Настоящий отказ от гарантий <strong>НЕ</strong> распространяется на:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Права потребителей, предусмотренные обязательными нормами законодательства</li>
                    <li>Гарантии конфиденциальности, указанные в разделе 4.1</li>
                    <li>Обязательства по SLA, указанные в разделе 6</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">8.2 Границы ответственности</h3>
                  <p className="mb-4"><strong>8.2.1 Провайдер НЕ несёт ответственности за:</strong></p>
                  <p className="mb-2"><strong>a) Проблемы на стороне Пользователя:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Нарушения безопасности, вызванные некорректной конфигурацией инфраструктуры Пользователя</li>
                    <li>Утечки данных, произошедшие из-за действий сотрудников или подрядчиков Пользователя</li>
                    <li>Компрометацию систем в результате атак на инфраструктуру Пользователя</li>
                    <li>Потерю данных из-за отсутствия резервного копирования на стороне Пользователя</li>
                  </ul>
                  
                  <p className="mb-2"><strong>b) Точность сканирования безопасности:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Ложноположительные срабатывания (обнаружение несуществующих уязвимостей)</li>
                    <li>Ложноотрицательные результаты (пропуск реальных уязвимостей)</li>
                    <li>Неполноту баз данных уязвимостей</li>
                  </ul>
                  
                  <p className="mb-2"><strong>c) Косвенные убытки:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Упущенную выгоду</li>
                    <li>Потерю деловой репутации</li>
                    <li>Потерю данных (кроме случаев прямой вины Провайдера)</li>
                    <li>Прерывание бизнеса</li>
                  </ul>
                  
                  <p className="mb-4"><strong>8.2.2 Максимальная ответственность</strong></p>
                  <p className="mb-4">Максимальная совокупная ответственность Провайдера по всем претензиям, связанным с Экосистемой, ограничена суммой, уплаченной Пользователем за подписку в течение 12 месяцев, предшествующих возникновению претензии.</p>
                  
                  <p className="mb-4"><strong>8.2.3 Исключения из ограничения ответственности</strong></p>
                  <p className="mb-2">Ограничения ответственности <strong>НЕ</strong> применяются к:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Умышленным действиям или грубой небрежности Провайдера</li>
                    <li>Нарушениям гарантий конфиденциальности (раздел 4.1)</li>
                    <li>Ущербу жизни или здоровью</li>
                    <li>Ответственности, которая не может быть ограничена в соответствии с применимым законодательством</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">8.3 Обязанность уменьшения убытков</h3>
                  <p className="mb-2">Пользователь обязуется:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Незамедлительно уведомлять Провайдера о выявленных проблемах</li>
                    <li>Предпринимать разумные меры для снижения ущерба</li>
                    <li>Сотрудничать с Провайдером в расследовании инцидентов</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">8.4 Форс-мажор</h3>
                  <p className="mb-2">Провайдер не несёт ответственности за неисполнение обязательств, вызванное обстоятельствами непреодолимой силы, включая:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Стихийные бедствия</li>
                    <li>Войны, теракты, эпидемии</li>
                    <li>Действия государственных органов</li>
                    <li>Отключения электроэнергии, сбои интернета</li>
                    <li>Кибератаки на инфраструктуру Провайдера</li>
                  </ul>
                </section>

                <section id="termination">
                  <h2 className="text-2xl font-semibold mb-4">9. Прекращение действия Условий</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">9.1 Прекращение по инициативе Пользователя</h3>
                  <p className="mb-4"><strong>9.1.1 Отмена подписки</strong></p>
                  <p className="mb-2">Пользователь может прекратить использование Экосистемы в любое время:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Подписка не продлевается автоматически после окончания текущего периода</li>
                    <li>Доступ к обновлениям прекращается после истечения оплаченного периода</li>
                    <li>Возврат средств осуществляется только в случаях, указанных в разделе 5.3</li>
                  </ul>
                  
                  <p className="mb-4"><strong>9.1.2 Сохранение локальных компонентов</strong></p>
                  <p className="mb-2">После прекращения подписки:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Все загруженные Компоненты остаются на инфраструктуре Пользователя</li>
                    <li>Компоненты продолжают функционировать с последней полученной базой данных безопасности</li>
                    <li>SitHub перестаёт получать обновления, но продолжает сканировать код локально</li>
                    <li>Провайдер не удаляет и не блокирует локальные компоненты</li>
                  </ul>
                  
                  <p className="mb-4"><strong>9.1.3 Удаление Экосистемы</strong></p>
                  <p className="mb-2">Пользователь самостоятельно удаляет Компоненты со своей инфраструктуры:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Провайдер предоставляет инструкции по безопасному удалению</li>
                    <li>Провайдер не несёт ответственности за остаточные данные после удаления</li>
                    <li>Пользователь несёт ответственность за полное удаление всех Компонентов</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">9.2 Прекращение по инициативе Провайдера</h3>
                  <p className="mb-4"><strong>9.2.1 Нарушение Условий</strong></p>
                  <p className="mb-2">Провайдер может немедленно прекратить предоставление услуг при:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Нарушении условий допустимого использования (раздел 10)</li>
                    <li>Обходе механизмов лицензирования</li>
                    <li>Незаконном использовании Экосистемы</li>
                    <li>Распространении Экосистемы или баз данных третьим лицам</li>
                  </ul>
                  
                  <p className="mb-4"><strong>9.2.2 Процедура при нарушении</strong></p>
                  <p className="mb-2">При выявлении нарушения:</p>
                  <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li>Провайдер отправляет письменное уведомление о нарушении</li>
                    <li>Пользователь имеет 14 дней для устранения нарушения</li>
                    <li>Если нарушение не устранено, подписка прекращается без возврата средств</li>
                    <li>Лицензионный ключ деактивируется</li>
                  </ol>
                  
                  <p className="mb-4"><strong>9.2.3 Прекращение предоставления услуг</strong></p>
                  <p className="mb-2">Провайдер может прекратить предоставление Экосистемы всем Пользователям:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>С предварительным уведомлением за 90 дней</li>
                    <li>С возвратом пропорциональной части оплаты за неиспользованный период</li>
                    <li>С предоставлением последних обновлений безопасности</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">9.3 Последствия прекращения</h3>
                  <p className="mb-4"><strong>9.3.1 Немедленные последствия</strong></p>
                  <p className="mb-2">После прекращения подписки:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Лицензионный ключ деактивируется</li>
                    <li>Прекращается доступ к обновлениям безопасности</li>
                    <li>Прекращается доступ к технической поддержке</li>
                    <li>Прекращается доступ к документации (для закрытых разделов)</li>
                  </ul>
                  
                  <p className="mb-4"><strong>9.3.2 Сохранение данных</strong></p>
                  <p className="mb-2">После прекращения:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Провайдер удаляет информацию о подписке в соответствии с Политикой конфиденциальности</li>
                    <li>Платёжные данные хранятся в соответствии с законодательными требованиями (7 лет)</li>
                    <li>Пользовательские данные (код, результаты сканирования) остаются на инфраструктуре Пользователя</li>
                  </ul>
                  
                  <p className="mb-4"><strong>9.3.3 Переживающие положения</strong></p>
                  <p className="mb-2">Следующие разделы остаются в силе после прекращения:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Раздел 7 (Интеллектуальная собственность)</li>
                    <li>Раздел 8 (Ограничение ответственности)</li>
                    <li>Раздел 12 (Применимое право и разрешение споров)</li>
                    <li>Раздел 4.2 (Обязанности Пользователя по обеспечению безопасности)</li>
                  </ul>
                </section>

                <section id="acceptable-use">
                  <h2 className="text-2xl font-semibold mb-4">10. Допустимое использование</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">10.1 Разрешённое использование</h3>
                  <p className="mb-2">Пользователь имеет право использовать Экосистему для:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Разработки программного обеспечения</li>
                    <li>Анализа кода на наличие уязвимостей безопасности</li>
                    <li>Управления корпоративными репозиториями</li>
                    <li>Обучения и образовательных целей (в рамках организации Пользователя)</li>
                    <li>Любых законных целей, связанных с разработкой ПО</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">10.2 Запрещённое использование</h3>
                  <p className="mb-2">Пользователь <strong>НЕ</strong> имеет права:</p>
                  
                  <p className="mb-2"><strong>10.2.1 Технические ограничения:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Осуществлять обратную разработку проприетарных компонентов Экосистемы</li>
                    <li>Пытаться извлечь исходный код проприетарных компонентов</li>
                    <li>Обходить механизмы лицензирования или аутентификации</li>
                    <li>Модифицировать Экосистему для обхода ограничений</li>
                  </ul>
                  
                  <p className="mb-2"><strong>10.2.2 Распространение:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Распространять Экосистему или её компоненты третьим лицам без письменного согласия Провайдера</li>
                    <li>Предоставлять доступ к Экосистеме лицам, не имеющим лицензии</li>
                    <li>Распространять базы данных уязвимостей, предоставленные Провайдером</li>
                    <li>Создавать конкурирующие продукты на основе Экосистемы</li>
                  </ul>
                  
                  <p className="mb-2"><strong>10.2.3 Незаконное использование:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Использовать Экосистему для разработки вредоносного ПО, эксплойтов или инструментов взлома</li>
                    <li>Использовать Экосистему для любых незаконных целей в соответствии с применимым законодательством</li>
                    <li>Использовать Экосистему для нарушения прав третьих лиц</li>
                    <li>Использовать Экосистему для обхода санкций или экспортных ограничений</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">10.3 Обоснование запретов</h3>
                  <p className="mb-2"><strong>10.3.1 Обратная разработка:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Наносит ущерб бизнес-модели Провайдера</li>
                    <li>Нарушает права интеллектуальной собственности</li>
                    <li>Может привести к созданию конкурирующих продуктов</li>
                  </ul>
                  
                  <p className="mb-2"><strong>10.3.2 Распространение баз данных:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Снижает эффективность баз данных уязвимостей</li>
                    <li>Злоумышленники могут адаптироваться к публично доступным данным</li>
                    <li>Нарушает коммерческую модель Провайдера</li>
                  </ul>
                  
                  <p className="mb-2"><strong>10.3.3 Обход лицензирования:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Является формой кражи интеллектуальной собственности</li>
                    <li>Лишает Провайдера законного дохода</li>
                    <li>Может привести к юридическим последствиям</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">10.4 Последствия нарушения</h3>
                  <p className="mb-2">При нарушении условий допустимого использования:</p>
                  <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li>Немедленное прекращение предоставления услуг</li>
                    <li>Деактивация лицензионного ключа</li>
                    <li>Отсутствие возврата средств</li>
                    <li>Возможные юридические действия для возмещения ущерба</li>
                  </ol>
                </section>

                <section id="compliance">
                  <h2 className="text-2xl font-semibold mb-4">11. Соответствие законодательству</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">11.1 Экспортный контроль</h3>
                  <p className="mb-4"><strong>11.1.1 Обязанности Пользователя</strong></p>
                  <p className="mb-2">Пользователь несёт ответственность за соблюдение всех применимых законов об экспортном контроле, включая:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Законы Республики Казахстан об экспортном контроле</li>
                    <li>Санкции и эмбарго, установленные Организацией Объединённых Наций</li>
                    <li>Экспортные ограничения США (если применимо)</li>
                    <li>Регулирование ЕС по двойному назначению (если применимо)</li>
                  </ul>
                  
                  <p className="mb-4"><strong>11.1.2 Запрещённые территории</strong></p>
                  <p className="mb-2">Экосистема не может использоваться на территориях, подпадающих под международные санкции, включая (но не ограничиваясь):</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Территории, обозначенные в санкционных списках ООН</li>
                    <li>Территории, подпадающие под санкции OFAC (США)</li>
                    <li>Территории, определённые в регулировании ЕС</li>
                  </ul>
                  <p className="mb-4"><strong>Важно:</strong> Список санкционных территорий изменяется. Пользователь обязан самостоятельно проверять актуальность санкционных списков.</p>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">11.2 Защита данных</h3>
                  <p className="mb-4"><strong>11.2.1 Соответствие GDPR (для пользователей из ЕС)</strong></p>
                  <p className="mb-2">Для Пользователей, находящихся в Европейском Союзе:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Провайдер выступает в роли обработчика данных (data processor)</li>
                    <li>Пользователь является контролёром данных (data controller)</li>
                    <li>Применяются положения Общего регламента по защите данных (GDPR)</li>
                    <li>Провайдер заключает Соглашение об обработке данных (Data Processing Agreement, DPA) по запросу</li>
                  </ul>
                  
                  <p className="mb-4"><strong>11.2.2 Стандартные договорные оговорки (SCC)</strong></p>
                  <p className="mb-2">При передаче персональных данных из ЕС в Казахстан:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Провайдер использует Стандартные договорные оговорки (Standard Contractual Clauses), утверждённые Европейской Комиссией</li>
                    <li>SCC доступны для ознакомления и подписания по запросу</li>
                    <li>Провайдер обеспечивает дополнительные технические меры защиты</li>
                  </ul>
                  
                  <p className="mb-4"><strong>11.2.3 Права субъектов данных (для пользователей из ЕС)</strong></p>
                  <p className="mb-2">Пользователи из ЕС имеют следующие права в соответствии с GDPR:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Право на доступ к персональным данным</li>
                    <li>Право на исправление неточных данных</li>
                    <li>Право на удаление данных («право быть забытым»)</li>
                    <li>Право на ограничение обработки</li>
                    <li>Право на переносимость данных</li>
                    <li>Право на возражение против обработки</li>
                  </ul>
                  <p className="mb-4">Для реализации этих прав обращайтесь: info@silence.codes</p>
                  
                  <p className="mb-4"><strong>11.2.4 Соответствие законодательству Республики Казахстан</strong></p>
                  <p className="mb-2">Провайдер соблюдает:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Закон Республики Казахстан «О персональных данных и их защите»</li>
                    <li>Требования по локализации данных (если применимо)</li>
                    <li>Требования по уведомлению об инцидентах безопасности</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">11.3 Хранение данных</h3>
                  <p className="mb-4"><strong>11.3.1 Сроки хранения</strong></p>
                  <div className="overflow-x-auto mb-4">
                    <table className="min-w-full border border-gray-600">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 px-4 py-2 text-left">Тип данных</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Срок хранения</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Основание</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Информация о подписке</td>
                          <td className="border border-gray-600 px-4 py-2">Период действия + 1 год</td>
                          <td className="border border-gray-600 px-4 py-2">Операционная необходимость</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Платёжные записи</td>
                          <td className="border border-gray-600 px-4 py-2">7 лет</td>
                          <td className="border border-gray-600 px-4 py-2">Налоговое законодательство РК</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Хеши лицензионных ключей</td>
                          <td className="border border-gray-600 px-4 py-2">Период действия + 1 год</td>
                          <td className="border border-gray-600 px-4 py-2">Предотвращение злоупотреблений</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Журналы запросов обновлений</td>
                          <td className="border border-gray-600 px-4 py-2">90 дней</td>
                          <td className="border border-gray-600 px-4 py-2">Техническая поддержка</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <p className="mb-4"><strong>11.3.2 Удаление данных</strong></p>
                  <p className="mb-2">По истечении сроков хранения:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Данные безвозвратно удаляются из всех систем Провайдера</li>
                    <li>Резервные копии перезаписываются в течение 90 дней</li>
                    <li>Пользователь может запросить досрочное удаление (за исключением данных с законодательными требованиями хранения)</li>
                  </ul>
                </section>

                <section id="law">
                  <h2 className="text-2xl font-semibold mb-4">12. Применимое право и разрешение споров</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">12.1 Применимое право</h3>
                  <p className="mb-4"><strong>12.1.1 Основное применимое право</strong></p>
                  <p className="mb-4">Настоящие Условия регулируются и толкуются в соответствии с законодательством Республики Казахстан, без учёта коллизионных норм.</p>
                  
                  <p className="mb-4"><strong>12.1.2 Императивные нормы других юрисдикций</strong></p>
                  <p className="mb-2">Выбор казахстанского права не отменяет:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Императивные нормы защиты прав потребителей в юрисдикции Пользователя</li>
                    <li>Обязательные требования GDPR для пользователей из ЕС</li>
                    <li>Другие обязательные нормы, от которых невозможно отступить по соглашению сторон</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">12.2 Разрешение споров</h3>
                  <p className="mb-4"><strong>12.2.1 Досудебное урегулирование</strong></p>
                  <p className="mb-2">Перед обращением в суд или арбитраж Стороны обязуются:</p>
                  <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li>Направить письменную претензию другой Стороне</li>
                    <li>Предоставить 30 дней для ответа и урегулирования</li>
                    <li>Добросовестно попытаться разрешить спор путём переговоров</li>
                  </ol>
                  <p className="mb-2">Претензии направляются:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Провайдеру: info@silence.codes</li>
                    <li>Пользователю: на контактный email, указанный при регистрации</li>
                  </ul>
                  
                  <p className="mb-4"><strong>12.2.2 Арбитраж</strong></p>
                  <p className="mb-2">Если досудебное урегулирование не привело к результату:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Споры подлежат разрешению в арбитраже в соответствии с Регламентом Международного арбитражного суда при Национальной палате предпринимателей Республики Казахстан «Атамекен»</li>
                    <li>Место арбитража: город Астана, Республика Казахстан</li>
                    <li>Язык арбитража: русский или английский (по соглашению сторон)</li>
                    <li>Применимое право: законодательство Республики Казахстан</li>
                  </ul>
                  
                  <p className="mb-4"><strong>12.2.3 Исключения для потребителей из ЕС</strong></p>
                  <p className="mb-2">Пользователи-потребители, находящиеся в Европейском Союзе, имеют право:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Подавать иски в судах своей страны проживания</li>
                    <li>Обращаться в суды Казахстана</li>
                  </ul>
                  
                  <p className="mb-4"><strong>12.2.4 Административные и срочные меры</strong></p>
                  <p className="mb-2">Ничто в настоящем разделе не препятствует Стороне:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Обращаться в суды за временными или срочными мерами защиты</li>
                    <li>Обращаться в административные органы (регуляторы, антимонопольные органы)</li>
                    <li>Защищать права интеллектуальной собственности в судах любой юрисдикции</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">12.3 Язык</h3>
                  <p className="mb-4"><strong>12.3.1 Официальная версия</strong></p>
                  <p className="mb-4">Официальной версией настоящих Условий является версия на русском языке.</p>
                  
                  <p className="mb-4"><strong>12.3.2 Переводы</strong></p>
                  <p className="mb-4">Провайдер может предоставлять переводы Условий на другие языки для удобства. В случае расхождений между переводом и русской версией, преимущество имеет русская версия.</p>
                </section>

                <section id="changes">
                  <h2 className="text-2xl font-semibold mb-4">13. Изменения Условий</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">13.1 Право на изменение</h3>
                  <p className="mb-2">Провайдер оставляет за собой право изменять настоящие Условия в любое время по следующим причинам:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Изменения в применимом законодательстве</li>
                    <li>Развитие функциональности Экосистемы</li>
                    <li>Изменения в бизнес-модели</li>
                    <li>Улучшение защиты интересов Пользователей</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">13.2 Уведомление об изменениях</h3>
                  <p className="mb-4"><strong>13.2.1 Несущественные изменения</strong></p>
                  <p className="mb-2">К несущественным относятся:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Исправление опечаток и грамматических ошибок</li>
                    <li>Уточнение формулировок без изменения смысла</li>
                    <li>Обновление контактной информации</li>
                  </ul>
                  <p className="mb-4">Уведомление: публикация на веб-сайте с указанием новой даты вступления в силу.</p>
                  
                  <p className="mb-4"><strong>13.2.2 Существенные изменения</strong></p>
                  <p className="mb-2">К существенным относятся изменения, которые:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Изменяют ваши права или обязанности</li>
                    <li>Влияют на обработку данных или конфиденциальность</li>
                    <li>Изменяют стоимость услуг</li>
                    <li>Изменяют гарантии или ограничения ответственности</li>
                  </ul>
                  <p className="mb-2">Уведомление:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Email-уведомление за 30 дней до вступления изменений в силу</li>
                    <li>Уведомление в интерфейсе SitHub</li>
                    <li>Публикация на веб-сайте с выделением изменений</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">13.3 Согласие с изменениями</h3>
                  <p className="mb-4"><strong>13.3.1 Продолжение использования</strong></p>
                  <p className="mb-4">Продолжая использовать Экосистему после вступления изменений в силу, вы подтверждаете согласие с обновлёнными Условиями.</p>
                  
                  <p className="mb-4"><strong>13.3.2 Отказ от изменений</strong></p>
                  <p className="mb-2">Если вы не согласны с изменениями:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Вы имеете право прекратить использование Экосистемы</li>
                    <li>Отмените подписку до даты вступления изменений в силу</li>
                    <li>При отмене в течение 14 дней после уведомления об существенных изменениях — пропорциональный возврат средств за неиспользованный период</li>
                  </ul>
                </section>

                <section id="misc">
                  <h2 className="text-2xl font-semibold mb-4">14. Прочие положения</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">14.1 Делимость положений</h3>
                  <p className="mb-2">Если какое-либо положение настоящих Условий будет признано недействительным или не имеющим юридической силы:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Остальные положения остаются в полной силе</li>
                    <li>Недействительное положение заменяется действительным положением, максимально близким по смыслу</li>
                    <li>Недействительность одного положения не влияет на действительность всего договора</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">14.2 Отказ от прав</h3>
                  <p className="mb-2">Неосуществление или задержка в осуществлении какого-либо права не означает отказа от такого права:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Молчание не является согласием на нарушение</li>
                    <li>Провайдер может осуществить свои права в любое время в будущем</li>
                    <li>Отказ от одного права не означает отказа от других прав</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">14.3 Передача прав</h3>
                  <p className="mb-4"><strong>14.3.1 Ограничения для Пользователя</strong></p>
                  <p className="mb-2">Пользователь не может передавать свои права и обязанности по настоящим Условиям без письменного согласия Провайдера, за исключением:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Передачи в рамках реорганизации компании (слияние, поглощение)</li>
                    <li>С предварительным письменным уведомлением Провайдера за 30 дней</li>
                  </ul>
                  
                  <p className="mb-4"><strong>14.3.2 Права Провайдера</strong></p>
                  <p className="mb-2">Провайдер может передавать свои права и обязанности:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Аффилированным компаниям</li>
                    <li>Правопреемникам при продаже бизнеса</li>
                    <li>С уведомлением Пользователей за 30 дней</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">14.4 Полнота соглашения</h3>
                  <p className="mb-2">Настоящие Условия совместно с Политикой конфиденциальности представляют собой полное соглашение между Сторонами и заменяют все предыдущие:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Устные договорённости</li>
                    <li>Письменные соглашения</li>
                    <li>Представления и заявления</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">14.5 Независимые подрядчики</h3>
                  <p className="mb-2">Стороны являются независимыми подрядчиками:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Настоящие Условия не создают отношений партнёрства, совместного предприятия или агентства</li>
                    <li>Ни одна из Сторон не имеет права представлять другую Сторону без письменного согласия</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">14.6 Уведомления</h3>
                  <p className="mb-4"><strong>14.6.1 Официальные уведомления направляются:</strong></p>
                  <p className="mb-2"><strong>Провайдеру:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Email: info@silence.codes</li>
                    <li>Почтовый адрес: город Астана, район Алматы, жилой массив ак-булак-3, переулок тасшокы, дом 3, квартира 26</li>
                  </ul>
                  <p className="mb-2"><strong>Пользователю:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>На email, указанный при регистрации</li>
                    <li>Через уведомления в интерфейсе SitHub</li>
                  </ul>
                  
                  <p className="mb-4"><strong>14.6.2 Считается, что уведомление получено:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Email: через 24 часа после отправки</li>
                    <li>Почта: через 5 рабочих дней после отправки (в пределах Казахстана), 14 дней (международная почта)</li>
                    <li>Интерфейс: немедленно при отображении</li>
                  </ul>
                </section>

                <section id="contact">
                  <h2 className="text-2xl font-semibold mb-4">15. Контактная информация</h2>
                  <p className="mb-4"><strong>Вопросы?</strong> Вопросы об условиях предоставления услуг, о вашей подписке, о том, как работает платформа?</p>
                  <p className="mb-4"><strong>Свяжитесь с нами:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Email: info@silence.codes</li>
                    <li>Время ответа: до 5 рабочих дней</li>
                  </ul>
                  <p className="mb-4 text-gray-400">Мы создали Экосистему для обеспечения безопасной разработки с соблюдением конфиденциальности. Настоящие Условия призваны защитить интересы обеих Сторон и обеспечить прозрачность наших отношений.</p>
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

export default TermsOfServiceSLNC;
