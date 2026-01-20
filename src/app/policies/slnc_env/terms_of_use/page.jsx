"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import PolicySidebar from '@/components/PolicySidebar';
import BackToTopButton from '@/components/BackToTopButton';
import Modal from '@/components/Modal';

const TermsOfUseSLNC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    document.title = currentLang === 'ru' ? 'Политики SLNC-env' : 'SLNC-env Policies';
  }, [currentLang]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const content = {
    en: {
      mainTitle: "SLNC-env Terms of Use",
      subTitle: "Terms of Use",
      sections: [
        { id: 'general', title: '1. General Provisions' },
        { id: 'access', title: '2. Access and License' },
        { id: 'confidentiality', title: '3. Confidentiality and Data' },
        { id: 'responsibilities', title: '4. User Responsibilities' },
        { id: 'subscription', title: '5. Subscription and Payment' },
        { id: 'liability', title: '6. Liability and Audit' },
        { id: 'contact', title: '7. Contacts' },
        { id: 'download', title: 'Download Full Terms' },
      ],
      download: {
        title: "Full Terms of Use",
        desc: "The detailed Terms of Use for SLNC-env are available for download below.",
        button: "Download Full Terms of Use (DOCX)",
        link: "/docs/Terms_of_Use_SLNC_env.docx"
      }
    },
    ru: {
      mainTitle: "Условия использования SLNC-env",
      subTitle: "Условия использования",
      sections: [
        { id: 'general', title: '1. Общие положения' },
        { id: 'access', title: '2. Доступ и лицензия' },
        { id: 'confidentiality', title: '3. Конфиденциальность и данные' },
        { id: 'responsibilities', title: '4. Обязанности пользователя' },
        { id: 'subscription', title: '5. Подписка и оплата' },
        { id: 'liability', title: '6. Ответственность и аудит' },
        { id: 'contact', title: '7. Контакты' },
        { id: 'download', title: 'Скачать полные условия' },
      ],
      download: {
        title: "Полный текст Условий использования",
        desc: "Подробные Условия использования SLNC-env доступны для скачивания ниже.",
        button: "Скачать Условия использования (DOCX)",
        link: "/docs/ru/Условия_использования_Silence_environment.docx"
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
                <section id="general">
                  <h2 className="text-2xl font-semibold mb-4">1. General Provisions</h2>
                  <p className="mb-4"><strong>1. Subject Matter:</strong> Governing access to Silence Environment (Ollama + LLM, SLNC-Code, SitHub).</p>
                  <p className="mb-4"><strong>2. Parties:</strong> Silence AI (Provider) and User.</p>
                  <p className="mb-4"><strong>3. Acceptance:</strong> Use/Installation/Subscription constitutes acceptance.</p>
                </section>

                <section id="access">
                  <h2 className="text-2xl font-semibold mb-4">2. Access and License</h2>
                  <p className="mb-4"><strong>1. License:</strong> Limited, non-exclusive, non-transferable license for annual subscription on local infrastructure.</p>
                  <p className="mb-4"><strong>2. Restrictions:</strong> Use for intended purpose only. No extraction/transfer of code.</p>
                  <p className="mb-4"><strong>3. Verification:</strong> Periodic license checks via hash/metadata (max once/24h).</p>
                </section>

                <section id="confidentiality">
                  <h2 className="text-2xl font-semibold mb-4">3. Confidentiality and Data Processing</h2>
                  <p className="mb-4"><strong>1. Principles:</strong> "Privacy by Design". Source code processed locally.</p>
                  <p className="mb-4"><strong>2. Data Collected:</strong> Subscription info, license hash, logs, technical metadata. Payment via third parties.</p>
                  <p className="mb-4"><strong>3. Telemetry:</strong> Optional, requires consent, anonymized.</p>
                  <p className="mb-4"><strong>4. Retention:</strong> Logs (90 days), Subscription (Term + 1 year), Payment (7 years).</p>
                </section>

                <section id="responsibilities">
                  <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities and Security</h2>
                  <p className="mb-4"><strong>1. Infrastructure:</strong> User ensures security, backups, updates, firewall.</p>
                  <p className="mb-4"><strong>2. Updates:</strong> User configures SitHub for updates.</p>
                  <p className="mb-4"><strong>3. Liability:</strong> Provider not liable for leaks due to user configuration/actions.</p>
                </section>

                <section id="subscription">
                  <h2 className="text-2xl font-semibold mb-4">5. Subscription, Payment, and Refunds</h2>
                  <p className="mb-4"><strong>1. Model:</strong> Annual subscription.</p>
                  <p className="mb-4"><strong>2. Payment:</strong> Advance payment, auto-renewal.</p>
                  <p className="mb-4"><strong>3. Refunds:</strong> Generally no refunds unless critical failure (&gt;7 days) or breach by Provider. EU 14-day withdrawal rights apply.</p>
                  <p className="mb-4"><strong>4. Reorganization:</strong> Transfer possible with notice.</p>
                </section>

                <section id="liability">
                  <h2 className="text-2xl font-semibold mb-4">6. Liability, Audit, and Contacts</h2>
                  <p className="mb-4"><strong>1. Warranties:</strong> Architectural impossibility of code transmission guaranteed. No liability for indirect damages.</p>
                  <p className="mb-4"><strong>2. Audit:</strong> Provider conducts annual audits. User can audit own traffic.</p>
                  <p className="mb-4"><strong>3. Incidents:</strong> Notification within legal timeframes (72h).</p>
                  <p className="mb-4"><strong>4. Termination:</strong> For violation/non-payment.</p>
                </section>

                <section id="contact">
                  <h2 className="text-2xl font-semibold mb-4">7. Contacts</h2>
                  <p className="mb-4">Email: info@silence.codes</p>
                </section>
              </>
            ) : (
              <>
                <section id="general">
                  <h2 className="text-2xl font-semibold mb-4">1. Общие положения</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">1.1. Предмет и область применения</h3>
                  <p className="mb-4">Настоящие Условия использования (далее — Условия) регулируют порядок доступа и использования программной платформы Silence Environment (далее — Экосистема) и её компонентов: Ollama + LLM, SLNC-Code, SitHub. Условия являются публичным офертным документом и дополняются Политикой конфиденциальности и технической документацией по архитектуре безопасности.</p>
                  <h3 className="text-xl font-semibold mb-3 mt-6">1.2. Стороны</h3>
                  <p className="mb-4">Провайдер — Silence AI, юридическое лицо, зарегистрированное в Республике Казахстан. Пользователь — физическое или юридическое лицо, использующее Экосистему.</p>
                  <h3 className="text-xl font-semibold mb-3 mt-6">1.3. Принятие условий</h3>
                  <p className="mb-4">Использование, установка или активация подписки означает полное и безоговорочное принятие Условий. Если вы не согласны с Условиями, вы не имеете права использовать Экосистему.</p>
                </section>

                <section id="access">
                  <h2 className="text-2xl font-semibold mb-4">2. Доступ и лицензия</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">2.1. Предоставляемая лицензия</h3>
                  <p className="mb-4">Провайдер предоставляет Пользователю ограниченную, неисключительную, непередаваемую лицензию на использование Экосистемы в рамках оплаченной годовой подписки. Лицензия действует только на локальной инфраструктуре Пользователя и не предоставляет Провайдеру прав на исходный код Пользователя.</p>
                  <h3 className="text-xl font-semibold mb-3 mt-6">2.2. Ограничения использования</h3>
                  <p className="mb-4">Пользователь обязуется использовать Экосистему в соответствии с назначением, не нарушать права третьих лиц и не предпринимать действий, направленных на извлечение, передачу или публикацию исходного кода и результатов сканирования за пределы локальной инфраструктуры.</p>
                  <h3 className="text-xl font-semibold mb-3 mt-6">2.3. Проверка лицензии</h3>
                  <p className="mb-4">SitHub периодически проверяет действительность лицензии, отправляя на серверы Провайдера хеш лицензионного ключа, временный токен сессии, версию SitHub и метаданные установки. Проверки не происходят чаще одного раза в 24 часа.</p>
                </section>

                <section id="confidentiality">
                  <h2 className="text-2xl font-semibold mb-4">3. Конфиденциальность и обработка данных</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">3.1. Принципы обработки</h3>
                  <p className="mb-4">Экосистема спроектирована по принципу Privacy by Design: исходный код и результаты сканирования обрабатываются и хранятся исключительно на инфраструктуре Пользователя. Провайдер не собирает и не хранит исходный код, результаты сканирования, метаданные репозиториев и учётные данные разработчиков.</p>
                  <h3 className="text-xl font-semibold mb-3 mt-6">3.2. Данные, которые собирает Провайдер</h3>
                  <p className="mb-4">Провайдер хранит и обрабатывает только данные, необходимые для управления подпиской и доставки обновлений: информация о подписке, хеш лицензионного ключа, журналы запросов и технические метаданные SitHub (включая IP-адрес, временные метки, версию SitHub). Платёжные данные обрабатываются сторонними платёжными провайдерами; Провайдер хранит только тип платёжного метода и последние четыре цифры карты.</p>
                  <h3 className="text-xl font-semibold mb-3 mt-6">3.3. Техническая телеметрия</h3>
                  <p className="mb-4">Дополнительная телеметрия и отчёты об ошибках собираются только при явном согласии Пользователя; такие данные проходят автоматическую фильтрацию для удаления фрагментов кода и конфиденциальной информации.</p>
                  <h3 className="text-xl font-semibold mb-3 mt-6">3.4. Правовые основания и сроки хранения</h3>
                  <p className="mb-4">Правовые основания обработки указаны в Политике конфиденциальности (исполнение договора, законные интересы, согласие). Сроки хранения: журналы запросов — 90 дней; данные подписки и хеши — период действия подписки плюс 1 год; платёжные записи — 7 лет в соответствии с налоговым законодательством.</p>
                </section>

                <section id="responsibilities">
                  <h2 className="text-2xl font-semibold mb-4">4. Обязанности пользователя и безопасность</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">4.1. Обязанности по защите локальной инфраструктуры</h3>
                  <p className="mb-4">Пользователь самостоятельно обеспечивает безопасность, резервное копирование и доступность своей инфраструктуры. В частности, Пользователь обязан:</p>
                  <ul className="list-disc list-inside mb-4 ml-4 space-y-2">
                    <li>настраивать и поддерживать межсетевые экраны и контроль доступа;</li>
                    <li>обновлять ОС и средства защиты;</li>
                    <li>обучать сотрудников правилам безопасной работы с Экосистемой;</li>
                    <li>не передавать исходный код вручную во внешние сервисы.</li>
                  </ul>
                  <h3 className="text-xl font-semibold mb-3 mt-6">4.2. Конфигурация обновлений</h3>
                  <p className="mb-4">Пользователь отвечает за настройку SitHub для получения обновлений безопасности и за своевременное применение критических патчей.</p>
                  <h3 className="text-xl font-semibold mb-3 mt-6">4.3. Ограничение ответственности Провайдера за действия Пользователя</h3>
                  <p className="mb-4">Провайдер не несёт ответственность за утечки или компрометации, вызванные неправильной конфигурацией, действиями сотрудников Пользователя или третьих лиц, а также за ручную передачу данных Пользователем.</p>
                </section>

                <section id="subscription">
                  <h2 className="text-2xl font-semibold mb-4">5. Подписка, оплата и возвраты</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">5.1. Модель подписки</h3>
                  <p className="mb-4">Экосистема предоставляется по годовой подписке. Подписка активируется на 12 месяцев с даты активации и включает полный доступ ко всем компонентам и регулярные обновления баз данных безопасности.</p>
                  <h3 className="text-xl font-semibold mb-3 mt-6">5.2. Оплата и продление</h3>
                  <p className="mb-4">Оплата производится ежегодно авансом. Подписка автоматически продлевается, если Пользователь не отменил её до окончания периода; уведомление о продлении направляется за 30 дней.</p>
                  <h3 className="text-xl font-semibold mb-3 mt-6">5.3. Политика возврата средств</h3>
                  <p className="mb-4">Возврат средств не предусмотрен, за исключением случаев: критического сбоя по вине Провайдера (сервис не функционирует более 7 дней подряд), доказанного нарушения гарантий конфиденциальности Провайдером или требований законодательства. Для пользователей из ЕС действует 14-дневное право на отказ с возможностью возврата пропорциональной стоимости услуг.</p>
                  <h3 className="text-xl font-semibold mb-3 mt-6">5.4. Условия при реорганизации бизнеса</h3>
                  <p className="mb-4">При слиянии или продаже бизнеса информация о подписках может быть передана правопреемнику; Пользователи будут уведомлены за 30 дней и получат возможность прекратить подписку с пропорциональным возвратом средств.</p>
                </section>

                <section id="liability">
                  <h2 className="text-2xl font-semibold mb-4">6. Ответственность, аудит и контакты</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-6">6.1. Гарантии и ограничения ответственности</h3>
                  <p className="mb-4">Провайдер гарантирует архитектурную невозможность передачи исходного кода при нормальной эксплуатации Экосистемы и обязуется не использовать код Пользователя для обучения моделей. Гарантия действует при условии соблюдения Пользователем технической документации. Провайдер не несёт ответственности за косвенные убытки, потерю прибыли или убытки, вызванные неправильной эксплуатацией со стороны Пользователя.</p>
                  <h3 className="text-xl font-semibold mb-3 mt-6">6.2. Аудит и прозрачность</h3>
                  <p className="mb-4">Провайдер проводит ежегодный независимый аудит безопасности и регулярное тестирование на проникновение; сводные отчёты публикуются без раскрытия конфиденциальной информации. Пользователь имеет право проводить собственный аудит сетевого трафика и запрашивать техническую документацию по архитектуре безопасности.</p>
                  <h3 className="text-xl font-semibold mb-3 mt-6">6.3. Инциденты безопасности</h3>
                  <p className="mb-4">В случае инцидента, затрагивающего данные, Провайдер уведомляет Пользователей и регуляторы в сроки, предусмотренные применимым законодательством (включая 72 часа для уведомлений по GDPR), и документирует все запросы и действия.</p>
                  <h3 className="text-xl font-semibold mb-3 mt-6">6.4. Прекращение доступа</h3>
                  <p className="mb-4">Провайдер вправе приостановить или прекратить доступ в случае нарушения Условий, злоупотреблений или неуплаты. При прекращении подписки доступ к обновлениям прекращается, а локальные компоненты продолжают работать с последней загруженной базой данных.</p>
                </section>

                <section id="contact">
                  <h2 className="text-2xl font-semibold mb-4">7. Контакты</h2>
                  <p className="mb-4">Остались вопросы? Вопросы об условиях использования, сервисе, политике конфиденциальности, архитектуре?</p>
                  <p className="mb-4">Свяжитесь с нами по адресу: <a href="mailto:info@silence.codes" className="text-blue-400 hover:text-blue-300">info@silence.codes</a></p>
                  <p className="mb-4">Условия призваны защитить интересы обеих Сторон и обеспечить прозрачность наших отношений.</p>
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

export default TermsOfUseSLNC;
