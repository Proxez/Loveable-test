export type Permit = {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  ref: string;
  summary: string;
  body: string[];
  tags: string[];
  authority: string;
  updated: string;
};

export type Category = {
  slug: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
};

export const categories: Category[] = [
  {
    slug: "bygglov",
    number: "Avdelning 1",
    title: "Bygglov, rivningslov & marklov",
    description:
      "Plan- och bygglovsprocesser, ritningskrav, kontrollplan och åtgärder som kräver lov inom detaljplanerat område.",
    tags: ["Bygglov", "Rivningslov", "Marklov", "PBL"],
  },
  {
    slug: "mark-och-gravning",
    number: "Avdelning 2",
    title: "Mark, gata & grävning",
    description:
      "Schakttillstånd, trafikanordningsplaner, ledningskoll och VA-utsättning vid arbete på allmän platsmark.",
    tags: ["Schakt", "TA-plan", "Ledningskoll", "Markupplåtelse"],
  },
  {
    slug: "natur-och-miljo",
    number: "Avdelning 3",
    title: "Natur & miljö",
    description:
      "Strandskydd, naturreservat, Natura 2000, biotopskydd, nyckelbiotoper, fornlämningar och åtgärder i vatten.",
    tags: ["Strandskydd", "Naturreservat", "Biotopskydd", "Vattenverksamhet"],
  },
];

export const permits: Permit[] = [
  {
    slug: "bygglov",
    title: "Ansökan om bygglov",
    category: "Bygglov, rivningslov & marklov",
    categorySlug: "bygglov",
    ref: "TH-1.01",
    summary:
      "Bygglovspliktiga delar i projekteringen kräver bygglov. Tidig kontakt med bygglovsenheten är obligatorisk.",
    body: [
      "Om det finns delar i projekteringen som är bygglovspliktiga måste bygglov sökas för dessa. I allmänhet ansöker projektledaren om bygglov och projektören tar fram ritningar som bifogas bygglovsansökan.",
      "Inför ansökan om bygglov ska alltid en tidig kontakt tas med bygglovsenheten på stadsbyggnadsförvaltningen för att ta reda på förutsättningar i det enskilda fallet. Det kan handla om planförutsättningar, riksintressen, strandskydd med mera samt för att få information om vad som behöver lämnas in tillsammans med ansökan.",
      "Bygglov och bygganmälan behövs enligt PBF kapitel 6 samt PBL kapitel 9 § 2. Du kan till exempel behöva bygglov för byggnad, mur, plank, informationsskylt, parkeringsplats, belysningsmast och markstrålkastare. Trafikskyltar samt informationsskyltar med allmängiltig information till allmänheten är undantagna från bygglovsplikten.",
      "Det du söker bygglov för ska ritas in på situationsplanen med relevanta mått för att bestämma byggnadens eller tillbyggnadens placering, som till exempel mått till angränsande fasad och fastighetsgräns. Situationsplanen ska vara baserad på ett utdrag ur kommunens baskarta.",
    ],
    tags: ["Bygglov", "PBL", "Situationsplan", "Ritningar"],
    authority: "Stadsbyggnadsförvaltningen",
    updated: "2025-12-08",
  },
  {
    slug: "rivningslov",
    title: "Rivningslov",
    category: "Bygglov, rivningslov & marklov",
    categorySlug: "bygglov",
    ref: "TH-1.02",
    summary:
      "Rivning av byggnad eller del av byggnad kräver rivningslov eller rivningsanmälan. Projektören tar fram en rivningsplan.",
    body: [
      "Om en byggnad eller en del av en byggnad ska rivas, behövs ett rivningslov eller en rivningsanmälan. Som byggnad räknas även öppna konstruktioner med tak som till exempel väderskydd.",
      "Till ett rivningslov ska projektören ta fram en rivningsplan som beskriver hur rivningen ska genomföras och hur rivningsmaterialet ska hanteras.",
    ],
    tags: ["Rivningslov", "Rivningsplan", "PBL"],
    authority: "Stadsbyggnadsförvaltningen",
    updated: "2025-12-08",
  },
  {
    slug: "marklov",
    title: "Marklov",
    category: "Bygglov, rivningslov & marklov",
    categorySlug: "bygglov",
    ref: "TH-1.03",
    summary:
      "Permanenta ändringar av markhöjder större än ±0,5 m kräver marklov. Sektioner i två riktningar ska redovisas.",
    body: [
      "Om markhöjder ändras permanent mer än ±0,5 meter från nuvarande höjd måste marklov sökas. Ändring av marknivån ska redovisas med två skalenliga sektioner (tänkt x-led och y-led) som visar den befintliga marklinjen och föreslagen ny marklinje. Plushöjder ska sättas ut i sektionerna och var sektionerna är tagna ska visas i plan.",
      "Marklov behöver inte sökas om höjderna ändrats i detaljplaneskedet och ändringen endast är ett genomförande av planen.",
      "Om det står i detaljplanen att det krävs marklov för fällning av träd, ska både träd och växtbädd skyddas. Om träd ändå måste fällas ska projektören ta fram en situationsplan som visar omfattningen av vilka träd som tas ner, vilka träd som blir kvar samt redovisa en eventuell återplantering.",
      "Om det står i detaljplanen att åtgärder vid märgelgrav kräver marklov, ska projektören ta fram en ritning som visar omfattningen av åtgärder vid märgelgraven.",
    ],
    tags: ["Marklov", "Markhöjder", "Träd", "Märgelgrav"],
    authority: "Stadsbyggnadsförvaltningen",
    updated: "2025-12-08",
  },
  {
    slug: "ledningskoll-va-utsattning",
    title: "Ledningskoll och VA-utsättning",
    category: "Mark, gata & grävning",
    categorySlug: "mark-och-gravning",
    ref: "TH-2.01",
    summary:
      "Utsättning av kommunala VA-ledningar beställs via e-tjänst. Andra ledningsägare kontaktas via Ledningskollen.",
    body: [
      "Du beställer utsättning av kommunala vatten- och avloppsledningar via vår e-tjänst VA-utsättning på helsingborg.se. Du kan även beställa VA-utsättning genom att skicka e-post till kartomat@helsingborg.se.",
      "Du kan också behöva veta var andra typer av ledningar går, till exempel el, telefoni och fjärrvärme. Kontakta respektive ledningsägare, till exempel Öresundskraft. Många ledningsägare är anslutna till webbtjänsten ledningskollen.se.",
    ],
    tags: ["VA", "Ledningar", "Utsättning", "Ledningskollen"],
    authority: "Stadsbyggnadsförvaltningen",
    updated: "2025-12-08",
  },
  {
    slug: "gravtillstand",
    title: "Tillstånd att gräva på allmän mark",
    category: "Mark, gata & grävning",
    categorySlug: "mark-och-gravning",
    ref: "TH-2.02",
    summary:
      "Alla grävningar på stadens mark kräver grävningstillstånd och gällande markavtal med staden.",
    body: [
      "För att säkerställa att grävning och återställning utförs på rätt sätt har Helsingborgs stad tagit fram riktlinjer som gäller för alla grävningar som utförs på stadens mark.",
      "För att få lov att gräva krävs att ledningsägaren har ett gällande markavtal med staden. För information och ansökan om grävningstillstånd, se Anvisningar för markanvändning.",
    ],
    tags: ["Grävning", "Schakt", "Markavtal", "Återställning"],
    authority: "Stadsbyggnadsförvaltningen",
    updated: "2025-12-08",
  },
  {
    slug: "ta-plan",
    title: "Trafikanordningsplan (TA-plan)",
    category: "Mark, gata & grävning",
    categorySlug: "mark-och-gravning",
    ref: "TH-2.03",
    summary:
      "Vid arbete på allmän platsmark krävs en TA-plan som reglerar avstängning och ansvar.",
    body: [
      "Vid alla arbeten på allmän platsmark krävs en trafikanordningsplan. Den reglerar hur en avstängning runt arbetsområdet ska vara utformad och vem som ansvarar för avstängningen.",
      "Entreprenören gör en ansökan via e-tjänsten Trafikanordningsplan på helsingborg.se.",
    ],
    tags: ["TA-plan", "Trafik", "Avstängning", "Entreprenör"],
    authority: "Stadsbyggnadsförvaltningen",
    updated: "2025-12-08",
  },
  {
    slug: "upplatelse-allman-platsmark",
    title: "Upplåtelse av allmän platsmark",
    category: "Mark, gata & grävning",
    categorySlug: "mark-och-gravning",
    ref: "TH-2.04",
    summary:
      "Bodar, skyltar, byggställningar m.m. på allmän mark kräver tillstånd från polisen.",
    body: [
      "Du som till exempel vill sätta upp skyltar, bodar eller byggställningar på allmän mark i samband med ett arbete måste söka tillstånd hos polisen.",
      "På helsingborg.se finns mer information samt länk till polisens blankett för att söka tillstånd för att använda allmän mark.",
    ],
    tags: ["Upplåtelse", "Skyltar", "Bodar", "Byggställning", "Polisen"],
    authority: "Polismyndigheten",
    updated: "2025-12-08",
  },
  {
    slug: "strandskydd",
    title: "Åtgärder inom strandskyddat område",
    category: "Natur & miljö",
    categorySlug: "natur-och-miljo",
    ref: "TH-3.01",
    summary:
      "Strandskydd gäller 100 m (på vissa platser 300 m) från strandkanten. Dispens söks hos miljönämnden.",
    body: [
      "Längs stränder och vattendrag gäller strandskydd. Generellt gäller det 100 meter från strandkanten men på vissa platser är det 300 meter. Strandskyddet gäller både mot land och i vattnet men också under vattnet.",
      "Inom den här zonen finns flera restriktioner. Du får till exempel inte gräva, bygga eller anlägga bryggor, murar med mera. Du får inte heller fälla träd eller gödsla marken.",
      "Du kan få dispens från strandskyddet om det finns särskilda skäl. Du ansöker hos miljönämnden via en blankett som finns på helsingborg.se.",
    ],
    tags: ["Strandskydd", "Dispens", "Miljönämnden", "Vattendrag"],
    authority: "Miljönämnden",
    updated: "2025-12-08",
  },
  {
    slug: "naturreservat-natura-2000",
    title: "Åtgärder inom naturreservat eller Natura 2000-område",
    category: "Natur & miljö",
    categorySlug: "natur-och-miljo",
    ref: "TH-3.02",
    summary:
      "Arbeten i naturreservat och Natura 2000-områden kräver dispens eller tillstånd från länsstyrelsen.",
    body: [
      "Om du vill göra arbeten i naturreservat behöver du i regel dispens från reservatsföreskrifterna. Det söker du hos länsstyrelsen eller hos miljöförvaltningen på Helsingborgs stad, beroende på om det är länsstyrelsen eller Helsingborgs kommunfullmäktige som fattat beslut om reservatet.",
      "För att utföra arbete inom Natura 2000-område krävs tillstånd som du söker hos Länsstyrelsen. Tillstånd kan även krävas om arbeten ska utföras utanför Natura 2000-området men som på ett betydande sätt kan påverka miljön i Natura 2000-området.",
    ],
    tags: ["Naturreservat", "Natura 2000", "Länsstyrelsen", "Dispens"],
    authority: "Länsstyrelsen i Skåne",
    updated: "2025-12-08",
  },
  {
    slug: "biotopskydd",
    title: "Åtgärder inom biotopskyddat område",
    category: "Natur & miljö",
    categorySlug: "natur-och-miljo",
    ref: "TH-3.03",
    summary:
      "Vissa biotoper är generellt skyddade enligt 7 kap. 11 § miljöbalken. Dispens söks hos länsstyrelsen.",
    body: [
      "Ska du utföra arbeten inom biotopskyddat område krävs dispens. Du ansöker på Länsstyrelsen i Skånes webbplats. Där finns också information om biotopskyddade områden.",
      "Regeringen har beslutat att vissa typer av biotoper är så värdefulla att de ska ha ett generellt biotopskydd. Det betyder att de har ett skydd per automatik och inte får skadas. Följande biotoper är generellt skyddade enligt 7 kap. 11 § miljöbalken: alléer, källor med omgivande våtmark i jordbruksmark, odlingsrösen i jordbruksmark, pilevallar, småvatten och våtmarker i jordbruksmark (som märgelgravar och bäckar), stenmurar i jordbruksmark samt åkerholmar.",
    ],
    tags: ["Biotopskydd", "Alléer", "Pilevallar", "Stenmurar", "Miljöbalken"],
    authority: "Länsstyrelsen i Skåne",
    updated: "2025-12-08",
  },
  {
    slug: "nyckelbiotoper",
    title: "Åtgärder intill nyckelbiotoper",
    category: "Natur & miljö",
    categorySlug: "natur-och-miljo",
    ref: "TH-3.04",
    summary:
      "Skogsstyrelsen har pekat ut ett tiotal nyckelbiotoper i Helsingborg. Åtgärder ska ske i samråd.",
    body: [
      "Nyckelbiotoper är utpekade skogsområden med mycket höga naturvärden. I Helsingborg finns ett tiotal nyckelbiotoper utpekade av Skogsstyrelsen.",
      "Där ska åtgärder ske i samråd med Skogsstyrelsen. På Skogsstyrelsens webbplats finns information om var nyckelbiotoperna finns.",
    ],
    tags: ["Nyckelbiotop", "Skogsstyrelsen", "Samråd"],
    authority: "Skogsstyrelsen",
    updated: "2025-12-08",
  },
  {
    slug: "fornlamningar",
    title: "Åtgärder i närheten av fornlämningar",
    category: "Natur & miljö",
    categorySlug: "natur-och-miljo",
    ref: "TH-3.05",
    summary:
      "Fornlämningar får inte ändras eller skadas. Kontakta länsstyrelsen i god tid inför arbeten.",
    body: [
      "Det är inte tillåtet att ändra eller skada fornlämningar. Det betyder bland annat att du inte får täcka över dem eller plantera eller bygga intill dem.",
      "Du ska kontakta Länsstyrelsen i god tid om du planerar arbeten i närheten av fornlämningar.",
    ],
    tags: ["Fornlämningar", "Länsstyrelsen", "Kulturmiljö"],
    authority: "Länsstyrelsen i Skåne",
    updated: "2025-12-08",
  },
  {
    slug: "atgarder-i-vatten",
    title: "Åtgärder i vatten",
    category: "Natur & miljö",
    categorySlug: "natur-och-miljo",
    ref: "TH-3.06",
    summary:
      "Vattenverksamhet är som huvudregel tillståndspliktig enligt 11 kap. miljöbalken.",
    body: [
      "Om du ska utföra åtgärder som påverkar vatten, ytvatten eller grundvatten, måste du i god tid ansöka om eventuellt tillstånd för vattenverksamhet.",
      "Vattenverksamhet är som huvudregel tillståndspliktig och du måste i god tid kontakta länsstyrelsen för information hur samråd och eventuell tillståndsansökan ska genomföras. Vissa åtgärder kräver inte tillstånd, men ska i stället anmälas till länsstyrelsen innan de får påbörjas.",
      "Bestämmelserna kring vattenverksamhet finns reglerade i kapitel 11 i miljöbalken. All tillståndsprövning utförs av Mark- och miljödomstolen men först måste Länsstyrelsen i Skåne kontaktas för samråd.",
    ],
    tags: ["Vattenverksamhet", "Miljöbalken", "Mark- och miljödomstolen"],
    authority: "Länsstyrelsen / Mark- och miljödomstolen",
    updated: "2025-12-08",
  },
];

export function searchPermits(query: string): Permit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  return permits
    .map((p) => {
      const haystack = [
        p.title,
        p.summary,
        p.category,
        p.ref,
        p.authority,
        p.tags.join(" "),
        p.body.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      const score = tokens.reduce(
        (acc, t) => acc + (haystack.includes(t) ? 1 : 0),
        0,
      );
      return { p, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.p);
}
