// Все данные лендинга в одном месте.
// ВНИМАНИЕ: помеченное «DEMO» — выдумка для показа, заменить после разговора с инструктором.
window.SITE = {
  brand: "Instructor Auto",
  city: "Кишинёв",

  // DEMO: номер скрыт на 999 за кнопкой «Показать телефон»
  phone: "+373 600 00 000",
  phoneHref: "+37360000000",
  viber: "viber://chat?number=%2B37360000000",
  whatsapp: "https://wa.me/37360000000",

  car: "Skoda Fabia",
  gearbox: "механика",
  priceFrom: 400, // из объявления на 999: «от 400 MDL / усл.»

  // Цена «от 400» — из объявления. Длительность 90 мин — рыночная норма (автошколы Кишинёва), у него НЕ уточнено.
  // 450 лей за доп. занятие — прайс автошколы Maestro (automaestro.md, окт. 2026). Поля *_ro — для ro.html
  packages: [
    { name: "Занятие 90 минут", price: "от 400", unit: "лей",
      note: "Индивидуальное практическое занятие: площадка, город или маршруты — по вашему запросу",
      name_ro: "Lecție de 90 de minute", price_ro: "de la 400", unit_ro: "lei",
      note_ro: "Lecție practică individuală: poligon, oraș sau trasee — la cererea dumneavoastră" },
    { name: "Дополнительные часы после автошколы", price: "от 400", unit: "лей / занятие", featured: true,
      note: "В автошколах дополнительное занятие часто стоит 450 лей. Здесь — дешевле и один на один",
      name_ro: "Ore suplimentare după școala auto", price_ro: "de la 400", unit_ro: "lei / lecție",
      note_ro: "La școlile auto o lecție suplimentară costă adesea 450 lei. Aici — mai ieftin și unu la unu" },
    { name: "Подготовка к экзамену", price: "от 400", unit: "лей / занятие",
      note: "Экзаменационные маршруты и площадка, разбор типичных ошибок",
      name_ro: "Pregătire pentru examen", price_ro: "de la 400", unit_ro: "lei / lecție",
      note_ro: "Traseele de examen și poligonul, analiza greșelilor tipice" }
  ]
};
