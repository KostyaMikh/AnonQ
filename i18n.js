// ============================================================
//  AnonQ — i18n (EN, RU, PL, ES)
//  Usage: add data-i18n="key" to any element
//  Placeholders: data-i18n-placeholder="key"
//  The language switcher is auto-injected into the navbar
// ============================================================

const LANGS = {
  en: {
    name: 'English', flag: '🇬🇧',
    t: {
      // Nav
      nav_login: 'Log in',
      nav_signup: 'Sign up',
      nav_dashboard: 'Dashboard',
      nav_find: 'Find someone',
      nav_creators: 'Creators',
      nav_leaderboard: '🏆 Top',
      nav_logout: 'Log out',

      // Index
      hero_title: 'Get <em>anonymous</em> questions from anyone',
      hero_sub: 'Share your link, let people ask you anything — or find someone by phone / Telegram and send them a secret question.',
      hero_cta1: 'Create your link',
      hero_cta2: 'Find someone',
      feature1_title: 'Share your link',
      feature1_desc: 'Post it on Instagram, Twitter, or any bio — your followers can ask you anything.',
      feature2_title: 'Receive questions',
      feature2_desc: 'Questions arrive completely anonymously — no sender info, ever.',
      feature3_title: 'Answer publicly',
      feature3_desc: 'Reply to questions and your answers show up on your public profile for everyone to read.',

      // Register
      reg_title: 'Create your account',
      reg_sub: 'Get your personal anonymous question link.',
      reg_username: 'Username *',
      reg_display: 'Display Name *',
      reg_password: 'Password *',
      reg_phone: 'Phone number',
      reg_telegram: 'Telegram username',
      reg_phone_hint: '(optional — lets others find you)',
      reg_tg_hint: '(optional)',
      reg_btn: 'Create account',
      reg_switch: 'Already have an account?',
      reg_login_link: 'Log in',
      err_username: 'Username must be 3–20 chars: letters, numbers, underscores only.',
      err_password: 'Password must be at least 6 characters.',

      // Login
      login_title: 'Welcome back',
      login_sub: 'Log in to see your anonymous questions.',
      login_btn: 'Log in',
      login_switch: 'No account yet?',
      login_reg_link: 'Sign up',

      // Dashboard
      dash_share_label: 'YOUR SHARE LINK',
      dash_copy: 'Copy',
      dash_unanswered: 'Unanswered',
      dash_answered: 'Answered',
      dash_all: 'All',
      dash_blocked: '🚫 Blocked',
      dash_view_public: 'View public profile ↗',
      dash_total: 'Total',
      dash_answer_btn: 'Answer',
      dash_edit_btn: 'Edit answer',
      dash_block_btn: '🚫 Block sender',
      dash_delete_btn: 'Delete',
      dash_post_answer: 'Post answer',
      dash_cancel: 'Cancel',
      dash_ans_label: 'Your answer',
      dash_empty_done: "No unanswered questions — you're all caught up!",
      dash_empty_none: 'Nothing here yet.',
      dash_received: 'Received',
      dash_no_blocked: 'No blocked senders.',
      dash_blocked_info: 'Blocked senders can\'t send you questions.',
      dash_unblock: 'Unblock',

      // Ask page
      ask_send_label: 'Send an anonymous question',
      ask_placeholder: 'Ask anything… they won\'t know it\'s you 👀',
      ask_btn: 'Send anonymously 🚀',
      ask_anon_hint: '100% anonymous — no account needed',
      ask_sent_title: 'Question sent!',
      ask_sent_sub: 'Your question was delivered anonymously.',
      ask_send_another: 'Send another',
      ask_no_answers: 'No answered questions yet — be the first to ask!',
      ask_answered_count: 'Answered questions',

      // Find page
      find_title: 'Find someone to ask',
      find_sub: 'Look up a registered user — or send an anonymous question to any email.',
      find_tab_user: 'Username',
      find_tab_phone: 'Phone',
      find_tab_tg: 'Telegram',
      find_tab_email: '✉️ By Email',
      find_username_label: 'AnonQ Username',
      find_phone_label: 'Phone Number',
      find_tg_label: 'Telegram Username',
      find_phone_hint: 'Only finds users who added their phone number to their profile.',
      find_tg_hint: 'Only finds users who added their Telegram to their profile.',
      find_btn: 'Find & Ask',
      find_email_label: 'Their Email Address',
      find_email_q: 'Your anonymous question',
      find_email_btn: 'Send anonymous question ✉️',
      find_email_hint: 'Sent securely — no account needed',
      find_email_info: '📨 Send to anyone, even without an account',
      find_email_desc: "They'll get an email saying someone sent them an anonymous question.",
      find_not_found_title: 'No one found',
      find_not_found_sub: "This person hasn't joined AnonQ yet — but you can still reach them by email.",
      find_email_instead: '✉️ Send by email instead',
      find_ask_btn: 'Ask →',

      // Leaderboard
      lb_title: '🏆 Leaderboard',
      lb_sub: 'Top users by questions received and answered',
      lb_received: '📩 Most questions received',
      lb_answered: '💬 Most questions answered',
      lb_ask_btn: 'Ask',
      lb_empty: 'No data yet — be the first to ask someone!',
      lb_received_lbl: 'received',
      lb_answered_lbl: 'answered',

      // Creators
      creators_title: 'Meet the Creators',
      creators_sub: 'The people who built AnonQ',
      mafiaKM_role: 'Lead Developer',
      mafiaKM_bio: 'Built AnonQ from the ground up. Full-stack developer, Telegram enthusiast, and Scratch creator.',
      redfan_role: 'Co-Creator',
      redfan_bio: 'Co-creator of AnonQ. Bringing the vision and creativity behind the project.',
      view_git: 'View Git Repo',
      view_tg: 'View in Telegram',
      view_scratch: 'View on Scratch',
      coming_soon: 'More links coming soon…',
    }
  },

  ru: {
    name: 'Русский', flag: '🇷🇺',
    t: {
      nav_login: 'Войти',
      nav_signup: 'Регистрация',
      nav_dashboard: 'Кабинет',
      nav_find: 'Найти',
      nav_creators: 'Создатели',
      nav_leaderboard: '🏆 Топ',
      nav_logout: 'Выйти',

      hero_title: 'Получай <em>анонимные</em> вопросы от кого угодно',
      hero_sub: 'Поделись ссылкой — пусть люди задают вопросы, или найди кого-то по телефону / Telegram.',
      hero_cta1: 'Создать ссылку',
      hero_cta2: 'Найти кого-то',
      feature1_title: 'Поделись ссылкой',
      feature1_desc: 'Размести в Instagram, Twitter или в описании — подписчики смогут задавать вопросы.',
      feature2_title: 'Получай вопросы',
      feature2_desc: 'Вопросы приходят полностью анонимно — никаких данных об отправителе.',
      feature3_title: 'Отвечай публично',
      feature3_desc: 'Твои ответы появляются на публичной странице — все могут читать.',

      reg_title: 'Создать аккаунт',
      reg_sub: 'Получи свою личную ссылку для анонимных вопросов.',
      reg_username: 'Имя пользователя *',
      reg_display: 'Отображаемое имя *',
      reg_password: 'Пароль *',
      reg_phone: 'Номер телефона',
      reg_telegram: 'Telegram',
      reg_phone_hint: '(необязательно — чтобы другие могли найти тебя)',
      reg_tg_hint: '(необязательно)',
      reg_btn: 'Создать аккаунт',
      reg_switch: 'Уже есть аккаунт?',
      reg_login_link: 'Войти',
      err_username: 'Имя пользователя: 3–20 символов, только буквы, цифры и _',
      err_password: 'Пароль должен быть не менее 6 символов.',

      login_title: 'С возвращением',
      login_sub: 'Войди, чтобы увидеть свои анонимные вопросы.',
      login_btn: 'Войти',
      login_switch: 'Нет аккаунта?',
      login_reg_link: 'Зарегистрироваться',

      dash_share_label: 'ТВОЯ ССЫЛКА',
      dash_copy: 'Копировать',
      dash_unanswered: 'Без ответа',
      dash_answered: 'Отвечено',
      dash_all: 'Все',
      dash_blocked: '🚫 Заблокированные',
      dash_view_public: 'Публичный профиль ↗',
      dash_total: 'Всего',
      dash_answer_btn: 'Ответить',
      dash_edit_btn: 'Изменить ответ',
      dash_block_btn: '🚫 Заблокировать',
      dash_delete_btn: 'Удалить',
      dash_post_answer: 'Опубликовать ответ',
      dash_cancel: 'Отмена',
      dash_ans_label: 'Твой ответ',
      dash_empty_done: 'Вопросов без ответа нет — отлично!',
      dash_empty_none: 'Пока ничего нет.',
      dash_received: 'Получено',
      dash_no_blocked: 'Нет заблокированных отправителей.',
      dash_blocked_info: 'Заблокированные не могут писать тебе вопросы.',
      dash_unblock: 'Разблокировать',

      ask_send_label: 'Задай анонимный вопрос',
      ask_placeholder: 'Спроси что угодно… они не узнают, кто ты 👀',
      ask_btn: 'Отправить анонимно 🚀',
      ask_anon_hint: '100% анонимно — аккаунт не нужен',
      ask_sent_title: 'Вопрос отправлен!',
      ask_sent_sub: 'Вопрос доставлен анонимно.',
      ask_send_another: 'Задать ещё вопрос',
      ask_no_answers: 'Ответов пока нет — задай первый вопрос!',
      ask_answered_count: 'Ответов на вопросы',

      find_title: 'Найти кого-то',
      find_sub: 'Ищи зарегистрированных пользователей или отправь вопрос на email.',
      find_tab_user: 'Имя пользователя',
      find_tab_phone: 'Телефон',
      find_tab_tg: 'Telegram',
      find_tab_email: '✉️ По Email',
      find_username_label: 'Имя пользователя AnonQ',
      find_phone_label: 'Номер телефона',
      find_tg_label: 'Имя в Telegram',
      find_phone_hint: 'Только пользователи, добавившие телефон в профиль.',
      find_tg_hint: 'Только пользователи, добавившие Telegram в профиль.',
      find_btn: 'Найти',
      find_email_label: 'Email получателя',
      find_email_q: 'Твой анонимный вопрос',
      find_email_btn: 'Отправить анонимный вопрос ✉️',
      find_email_hint: 'Отправляется безопасно — аккаунт не нужен',
      find_email_info: '📨 Написать кому угодно, даже без аккаунта',
      find_email_desc: 'Им придёт письмо с анонимным вопросом.',
      find_not_found_title: 'Никого не найдено',
      find_not_found_sub: 'Этот человек ещё не зарегистрирован в AnonQ — можно написать по email.',
      find_email_instead: '✉️ Написать по email',
      find_ask_btn: 'Спросить →',

      lb_title: '🏆 Рейтинг',
      lb_sub: 'Топ пользователей по вопросам',
      lb_received: '📩 Больше всего вопросов',
      lb_answered: '💬 Больше всего ответов',
      lb_ask_btn: 'Спросить',
      lb_empty: 'Данных пока нет — задай первый вопрос!',
      lb_received_lbl: 'вопросов',
      lb_answered_lbl: 'ответов',

      creators_title: 'Создатели',
      creators_sub: 'Люди, которые создали AnonQ',
      mafiaKM_role: 'Ведущий разработчик',
      mafiaKM_bio: 'Создал AnonQ с нуля. Full-stack разработчик, любитель Telegram и Scratch.',
      redfan_role: 'Со-создатель',
      redfan_bio: 'Со-создатель AnonQ. Отвечает за идею и креатив проекта.',
      view_git: 'Git репозиторий',
      view_tg: 'Написать в Telegram',
      view_scratch: 'Scratch профиль',
      coming_soon: 'Ссылки скоро появятся…',
    }
  },

  pl: {
    name: 'Polski', flag: '🇵🇱',
    t: {
      nav_login: 'Zaloguj się',
      nav_signup: 'Zarejestruj się',
      nav_dashboard: 'Panel',
      nav_find: 'Znajdź kogoś',
      nav_creators: 'Twórcy',
      nav_leaderboard: '🏆 Top',
      nav_logout: 'Wyloguj',

      hero_title: 'Otrzymuj <em>anonimowe</em> pytania od każdego',
      hero_sub: 'Udostępnij link — niech ludzie zadają pytania, lub znajdź kogoś przez telefon / Telegram.',
      hero_cta1: 'Utwórz link',
      hero_cta2: 'Znajdź kogoś',
      feature1_title: 'Udostępnij link',
      feature1_desc: 'Wklej w bio na Instagramie, Twitterze — obserwujący mogą zadawać pytania.',
      feature2_title: 'Otrzymuj pytania',
      feature2_desc: 'Pytania przychodzą całkowicie anonimowo — zero danych o nadawcy.',
      feature3_title: 'Odpowiadaj publicznie',
      feature3_desc: 'Twoje odpowiedzi pojawiają się na publicznym profilu — każdy może czytać.',

      reg_title: 'Utwórz konto',
      reg_sub: 'Zdobądź swój osobisty link do anonimowych pytań.',
      reg_username: 'Nazwa użytkownika *',
      reg_display: 'Wyświetlana nazwa *',
      reg_password: 'Hasło *',
      reg_phone: 'Numer telefonu',
      reg_telegram: 'Nazwa użytkownika Telegram',
      reg_phone_hint: '(opcjonalnie — umożliwia znalezienie cię)',
      reg_tg_hint: '(opcjonalnie)',
      reg_btn: 'Utwórz konto',
      reg_switch: 'Masz już konto?',
      reg_login_link: 'Zaloguj się',
      err_username: 'Nazwa użytkownika: 3–20 znaków, litery, cyfry i _',
      err_password: 'Hasło musi mieć co najmniej 6 znaków.',

      login_title: 'Witaj z powrotem',
      login_sub: 'Zaloguj się, aby zobaczyć swoje anonimowe pytania.',
      login_btn: 'Zaloguj się',
      login_switch: 'Nie masz konta?',
      login_reg_link: 'Zarejestruj się',

      dash_share_label: 'TWÓJ LINK',
      dash_copy: 'Kopiuj',
      dash_unanswered: 'Bez odpowiedzi',
      dash_answered: 'Odpowiedziane',
      dash_all: 'Wszystkie',
      dash_blocked: '🚫 Zablokowane',
      dash_view_public: 'Profil publiczny ↗',
      dash_total: 'Łącznie',
      dash_answer_btn: 'Odpowiedz',
      dash_edit_btn: 'Edytuj odpowiedź',
      dash_block_btn: '🚫 Zablokuj nadawcę',
      dash_delete_btn: 'Usuń',
      dash_post_answer: 'Opublikuj odpowiedź',
      dash_cancel: 'Anuluj',
      dash_ans_label: 'Twoja odpowiedź',
      dash_empty_done: 'Brak pytań bez odpowiedzi — świetna robota!',
      dash_empty_none: 'Nic tu jeszcze nie ma.',
      dash_received: 'Otrzymano',
      dash_no_blocked: 'Brak zablokowanych nadawców.',
      dash_blocked_info: 'Zablokowani nie mogą wysyłać ci pytań.',
      dash_unblock: 'Odblokuj',

      ask_send_label: 'Wyślij anonimowe pytanie',
      ask_placeholder: 'Zapytaj o cokolwiek… nie dowiedzą się, kto pytał 👀',
      ask_btn: 'Wyślij anonimowo 🚀',
      ask_anon_hint: '100% anonimowo — konto nie jest wymagane',
      ask_sent_title: 'Pytanie wysłane!',
      ask_sent_sub: 'Pytanie zostało dostarczone anonimowo.',
      ask_send_another: 'Wyślij kolejne',
      ask_no_answers: 'Brak odpowiedzi — zadaj pierwsze pytanie!',
      ask_answered_count: 'Odpowiedziane pytania',

      find_title: 'Znajdź kogoś',
      find_sub: 'Szukaj zarejestrowanych użytkowników lub wyślij pytanie na email.',
      find_tab_user: 'Nazwa użytkownika',
      find_tab_phone: 'Telefon',
      find_tab_tg: 'Telegram',
      find_tab_email: '✉️ Przez Email',
      find_username_label: 'Nazwa użytkownika AnonQ',
      find_phone_label: 'Numer telefonu',
      find_tg_label: 'Nazwa w Telegram',
      find_phone_hint: 'Tylko użytkownicy, którzy dodali numer telefonu.',
      find_tg_hint: 'Tylko użytkownicy, którzy dodali Telegram.',
      find_btn: 'Znajdź',
      find_email_label: 'Email odbiorcy',
      find_email_q: 'Twoje anonimowe pytanie',
      find_email_btn: 'Wyślij anonimowe pytanie ✉️',
      find_email_hint: 'Wysyłane bezpiecznie — konto nie jest wymagane',
      find_email_info: '📨 Napisz do każdego, nawet bez konta',
      find_email_desc: 'Otrzymają email z anonimowym pytaniem.',
      find_not_found_title: 'Nie znaleziono',
      find_not_found_sub: 'Ta osoba nie jest jeszcze w AnonQ — możesz napisać przez email.',
      find_email_instead: '✉️ Wyślij przez email',
      find_ask_btn: 'Zapytaj →',

      lb_title: '🏆 Ranking',
      lb_sub: 'Najlepsi użytkownicy według pytań',
      lb_received: '📩 Najwięcej pytań',
      lb_answered: '💬 Najwięcej odpowiedzi',
      lb_ask_btn: 'Zapytaj',
      lb_empty: 'Brak danych — zadaj pierwsze pytanie!',
      lb_received_lbl: 'pytań',
      lb_answered_lbl: 'odpowiedzi',

      creators_title: 'Twórcy',
      creators_sub: 'Osoby, które stworzyły AnonQ',
      mafiaKM_role: 'Główny deweloper',
      mafiaKM_bio: 'Zbudował AnonQ od podstaw. Full-stack developer, entuzjasta Telegrama i Scratcha.',
      redfan_role: 'Współtwórca',
      redfan_bio: 'Współtwórca AnonQ. Odpowiada za wizję i kreatywność projektu.',
      view_git: 'Repozytorium Git',
      view_tg: 'Napisz na Telegram',
      view_scratch: 'Profil na Scratch',
      coming_soon: 'Więcej linków wkrótce…',
    }
  },

  es: {
    name: 'Español', flag: '🇪🇸',
    t: {
      nav_login: 'Iniciar sesión',
      nav_signup: 'Registrarse',
      nav_dashboard: 'Panel',
      nav_find: 'Buscar',
      nav_creators: 'Creadores',
      nav_leaderboard: '🏆 Top',
      nav_logout: 'Cerrar sesión',

      hero_title: 'Recibe preguntas <em>anónimas</em> de cualquier persona',
      hero_sub: 'Comparte tu enlace y deja que te pregunten lo que quieran, o busca a alguien por teléfono / Telegram.',
      hero_cta1: 'Crear mi enlace',
      hero_cta2: 'Buscar a alguien',
      feature1_title: 'Comparte tu enlace',
      feature1_desc: 'Publícalo en Instagram, Twitter o tu bio — tus seguidores pueden preguntarte.',
      feature2_title: 'Recibe preguntas',
      feature2_desc: 'Las preguntas llegan completamente anónimas — sin datos del remitente.',
      feature3_title: 'Responde públicamente',
      feature3_desc: 'Tus respuestas aparecen en tu perfil público para que todos las lean.',

      reg_title: 'Crear una cuenta',
      reg_sub: 'Obtén tu enlace personal para preguntas anónimas.',
      reg_username: 'Nombre de usuario *',
      reg_display: 'Nombre visible *',
      reg_password: 'Contraseña *',
      reg_phone: 'Número de teléfono',
      reg_telegram: 'Usuario de Telegram',
      reg_phone_hint: '(opcional — permite que otros te encuentren)',
      reg_tg_hint: '(opcional)',
      reg_btn: 'Crear cuenta',
      reg_switch: '¿Ya tienes cuenta?',
      reg_login_link: 'Iniciar sesión',
      err_username: 'El usuario debe tener 3–20 caracteres: letras, números y _',
      err_password: 'La contraseña debe tener al menos 6 caracteres.',

      login_title: 'Bienvenido de nuevo',
      login_sub: 'Inicia sesión para ver tus preguntas anónimas.',
      login_btn: 'Iniciar sesión',
      login_switch: '¿No tienes cuenta?',
      login_reg_link: 'Registrarse',

      dash_share_label: 'TU ENLACE',
      dash_copy: 'Copiar',
      dash_unanswered: 'Sin responder',
      dash_answered: 'Respondidas',
      dash_all: 'Todas',
      dash_blocked: '🚫 Bloqueados',
      dash_view_public: 'Ver perfil público ↗',
      dash_total: 'Total',
      dash_answer_btn: 'Responder',
      dash_edit_btn: 'Editar respuesta',
      dash_block_btn: '🚫 Bloquear remitente',
      dash_delete_btn: 'Eliminar',
      dash_post_answer: 'Publicar respuesta',
      dash_cancel: 'Cancelar',
      dash_ans_label: 'Tu respuesta',
      dash_empty_done: '¡Sin preguntas sin responder — al día!',
      dash_empty_none: 'Nada aquí todavía.',
      dash_received: 'Recibida',
      dash_no_blocked: 'Sin remitentes bloqueados.',
      dash_blocked_info: 'Los bloqueados no pueden enviarte preguntas.',
      dash_unblock: 'Desbloquear',

      ask_send_label: 'Envía una pregunta anónima',
      ask_placeholder: 'Pregunta lo que quieras… no sabrán quién eres 👀',
      ask_btn: 'Enviar anónimamente 🚀',
      ask_anon_hint: '100% anónimo — no necesitas cuenta',
      ask_sent_title: '¡Pregunta enviada!',
      ask_sent_sub: 'Tu pregunta fue entregada de forma anónima.',
      ask_send_another: 'Enviar otra',
      ask_no_answers: 'Sin respuestas aún — ¡sé el primero en preguntar!',
      ask_answered_count: 'Preguntas respondidas',

      find_title: 'Buscar a alguien',
      find_sub: 'Busca usuarios registrados o envía una pregunta por email.',
      find_tab_user: 'Usuario',
      find_tab_phone: 'Teléfono',
      find_tab_tg: 'Telegram',
      find_tab_email: '✉️ Por Email',
      find_username_label: 'Usuario de AnonQ',
      find_phone_label: 'Número de teléfono',
      find_tg_label: 'Usuario de Telegram',
      find_phone_hint: 'Solo usuarios que añadieron su teléfono al perfil.',
      find_tg_hint: 'Solo usuarios que añadieron su Telegram al perfil.',
      find_btn: 'Buscar',
      find_email_label: 'Email del destinatario',
      find_email_q: 'Tu pregunta anónima',
      find_email_btn: 'Enviar pregunta anónima ✉️',
      find_email_hint: 'Enviado de forma segura — sin cuenta necesaria',
      find_email_info: '📨 Escribe a cualquiera, incluso sin cuenta',
      find_email_desc: 'Recibirán un email con la pregunta anónima.',
      find_not_found_title: 'No se encontró a nadie',
      find_not_found_sub: 'Esta persona aún no está en AnonQ — puedes escribirle por email.',
      find_email_instead: '✉️ Enviar por email',
      find_ask_btn: 'Preguntar →',

      lb_title: '🏆 Clasificación',
      lb_sub: 'Usuarios con más preguntas',
      lb_received: '📩 Más preguntas recibidas',
      lb_answered: '💬 Más preguntas respondidas',
      lb_ask_btn: 'Preguntar',
      lb_empty: 'Sin datos aún — ¡pregunta a alguien!',
      lb_received_lbl: 'recibidas',
      lb_answered_lbl: 'respondidas',

      creators_title: 'Creadores',
      creators_sub: 'Las personas que crearon AnonQ',
      mafiaKM_role: 'Desarrollador principal',
      mafiaKM_bio: 'Construyó AnonQ desde cero. Desarrollador full-stack, entusiasta de Telegram y Scratch.',
      redfan_role: 'Co-creador',
      redfan_bio: 'Co-creador de AnonQ. Responsable de la visión y la creatividad del proyecto.',
      view_git: 'Repositorio Git',
      view_tg: 'Ver en Telegram',
      view_scratch: 'Ver en Scratch',
      coming_soon: 'Más enlaces próximamente…',
    }
  },
};

// ── Core i18n engine ──────────────────────────────────────────
const I18N = {
  current: 'en',

  init() {
    // Auto-detect: saved preference → browser language → default en
    const saved = localStorage.getItem('aq_lang');
    const browser = navigator.language?.slice(0, 2).toLowerCase();
    const detected = saved || (LANGS[browser] ? browser : 'en');
    this.setLang(detected, false);
    this._injectSwitcher();
  },

  t(key) {
    return LANGS[this.current]?.t[key] ?? LANGS.en.t[key] ?? key;
  },

  setLang(code, save = true) {
    if (!LANGS[code]) return;
    this.current = code;
    if (save) localStorage.setItem('aq_lang', code);
    this._applyTranslations();
    this._updateSwitcher();
    document.documentElement.lang = code;
  },

  _applyTranslations() {
    // data-i18n="key" → innerText
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = this.t(key);
      if (val) el.textContent = val;
    });
    // data-i18n-placeholder="key" → placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = this.t(key);
      if (val) el.placeholder = val;
    });
    // data-i18n-html="key" → innerHTML (for hero title with <em>)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const val = this.t(key);
      if (val) el.innerHTML = val;
    });
  },

  _injectSwitcher() {
    // Inject into navbar-actions on every page
    const actions = document.querySelector('.navbar-actions');
    if (!actions) return;

    const wrap = document.createElement('div');
    wrap.className = 'lang-picker-wrap';
    wrap.id = 'langPicker';
    wrap.innerHTML = `
      <button class="lang-toggle-btn" onclick="I18N._toggleDropdown(event)" aria-label="Language">
        <span id="langFlag">${this.current.toUpperCase()}</span>
      </button>
      <div class="lang-dropdown" id="langDropdown">
        ${Object.entries(LANGS).map(([code, lang]) => `
          <button class="lang-option${code === this.current ? ' active' : ''}"
                  data-lang="${code}"
                  onclick="I18N.setLang('${code}')">
            <span>${lang.flag}</span>
            <span>${lang.name}</span>
            <span class="lang-check">✓</span>
          </button>`).join('')}
      </div>`;

    // Inject styles once
    if (!document.getElementById('lang-styles')) {
      const style = document.createElement('style');
      style.id = 'lang-styles';
      style.textContent = `
        .lang-picker-wrap { position: relative; }
        .lang-toggle-btn {
          background: var(--surface2); border: 1px solid var(--border);
          border-radius: var(--radius-sm, 8px); width: 36px; height: 36px;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.03em;
          color: var(--text-muted); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: border-color .2s, color .2s;
          font-family: inherit;
        }
        .lang-toggle-btn:hover { border-color: var(--accent2); color: var(--text); }
        .lang-dropdown {
          display: none; position: absolute; top: calc(100% + 8px); right: 0;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius, 14px); padding: 8px; min-width: 150px;
          box-shadow: 0 8px 32px rgba(0,0,0,.45); z-index: 9999;
        }
        .lang-dropdown.open { display: block; }
        .lang-option {
          display: flex; align-items: center; gap: 10px; width: 100%;
          background: transparent; border: none; border-radius: 8px;
          padding: 9px 10px; cursor: pointer; color: var(--text);
          font-size: .9rem; font-family: inherit; transition: background .15s;
        }
        .lang-option:hover { background: var(--surface2); }
        .lang-option.active { background: var(--surface2); }
        .lang-check { margin-left: auto; color: var(--accent2); opacity: 0; font-size: .85rem; }
        .lang-option.active .lang-check { opacity: 1; }
      `;
      document.head.appendChild(style);
    }

    actions.insertBefore(wrap, actions.firstChild);

    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) document.getElementById('langDropdown')?.classList.remove('open');
    });
  },

  _toggleDropdown(e) {
    e.stopPropagation();
    document.getElementById('langDropdown')?.classList.toggle('open');
  },

  _updateSwitcher() {
    const flag = document.getElementById('langFlag');
    if (flag) flag.textContent = this.current.toUpperCase();
    document.querySelectorAll('.lang-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.current);
    });
  },
};

document.addEventListener('DOMContentLoaded', () => I18N.init());
