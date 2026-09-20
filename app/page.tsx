const colorSwatches = [
  { name: "Primary 500", value: "#F26A3C" },
  { name: "Primary 400", value: "#F38B5C" },
  { name: "Primary 300", value: "#F7B892" },
  { name: "Primary 200", value: "#FCE8DE" },
  { name: "Neutral 900", value: "#0F172A" },
  { name: "Neutral 700", value: "#2F3D4D" },
  { name: "Neutral 600", value: "#4A5868" },
  { name: "Neutral 500", value: "#6B7280" },
  { name: "Neutral 300", value: "#D9D9D6" },
  { name: "Neutral 200", value: "#E7E5E4" },
  { name: "Neutral 100", value: "#F5F3F2" },
  { name: "White", value: "#FFFFFF" },
];

const typeScale = [
  { label: "Display 1", family: "Playfair Display", size: "48 / 56", weight: "Bold", use: "Page titles" },
  { label: "Display 2", family: "Playfair Display", size: "36 / 44", weight: "Bold", use: "Section titles" },
  { label: "Heading 1", family: "Inter", size: "28 / 36", weight: "Semi Bold", use: "Card titles" },
  { label: "Heading 2", family: "Inter", size: "22 / 30", weight: "Semi Bold", use: "Sub section titles" },
  { label: "Heading 3", family: "Inter", size: "18 / 24", weight: "Medium", use: "Small titles" },
  { label: "Body Large", family: "Inter", size: "16 / 24", weight: "Regular", use: "Body copy" },
  { label: "Body", family: "Inter", size: "16 / 24", weight: "Regular", use: "Supporting text" },
  { label: "Small", family: "Inter", size: "12 / 16", weight: "Regular", use: "Captions, meta" },
];

const spacingRows = [
  { amount: 4, label: "4", value: "0.25rem" },
  { amount: 8, label: "8", value: "0.5rem" },
  { amount: 12, label: "12", value: "0.75rem" },
  { amount: 16, label: "16", value: "1rem" },
  { amount: 24, label: "24", value: "1.5rem" },
  { amount: 32, label: "32", value: "2rem" },
  { amount: 40, label: "40", value: "2.5rem" },
  { amount: 48, label: "48", value: "3rem" },
  { amount: 64, label: "64", value: "4rem" },
];

const radiusValues = [
  { label: "4px", size: "4px" },
  { label: "8px", size: "8px" },
  { label: "12px", size: "12px" },
  { label: "16px", size: "16px" },
  { label: "24px", size: "24px" },
  { label: "Full", size: "9999px" },
];

const shadowValues = [
  { name: "Sm", values: "0 2px 8px 0 rgba(15, 23, 42, 0.08)" },
  { name: "Md", values: "0 4px 14px 0 rgba(15, 23, 42, 0.12)" },
  { name: "Lg", values: "0 8px 24px 0 rgba(15, 23, 42, 0.12)" },
  { name: "Xl", values: "0 12px 32px 0 rgba(15, 23, 42, 0.16)" },
];

const iconNames = ["Bell", "Search", "Play", "Chart", "Book", "Gear", "User", "Arrow"]; 

const statusBadges = ["In Progress", "Completed", "Now Playing", "Blocked"];

const courseCards = [
  {
    kind: "Course Card",
    title: "Next.js for Production",
    text: "Build scalable, high-performance web applications with Next.js.",
    accent: "#F26A3C",
    meta: ["Intermediate", "8h 24m", "12 modules"],
  },
  {
    kind: "Lesson Card (video)",
    title: "Data Fetching in Server Components",
    text: "Learn how to fetch data on the server using Next.js and React patterns.",
    accent: "#F26A3C",
    meta: ["Video", "10m 24s", "Watch"],
  },
  {
    kind: "Lesson Card (guide)",
    title: "Data Fetching & Caching",
    text: "Explore different fetch caching methods to improve performance.",
    accent: "#F26A3C",
    meta: ["Lesson", "Module 6", "View lesson"],
  },
  {
    kind: "Resource Card",
    title: "Caching and Validation Guide",
    text: "Deep dive into Next.js caching strategies and invalidation patterns.",
    accent: "#F26A3C",
    meta: ["PDF • 1.2 MB", "Download"],
  },
];

const navItems = ["All Courses", "Next.js for Production", "Data Fetching & Caching"];

function VertexMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-label="Vertex brand mark" role="img">
      <path d="M2 8.5 7.8 4h16.4L30 8.5 17.4 28h-3.8L2 8.5Z" fill="#F26A3C" />
      <path d="M8 10.8 12.5 4.8h7.5L24 10.8l-8.4 15.6h-2.1L8 10.8Z" fill="#fff" opacity={0.12} />
      <path d="M10 13.2 15.1 5.6h2.2l4.9 7.6-6.1 11.9h-2.4L10 13.2Z" fill="#fff" opacity={0.9} />
    </svg>
  );
}

function SectionHeader({ number, label }: { number: string; label: string }) {
  return (
    <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-[#1d1d1d] uppercase">
      <span className="text-[#1d1d1d]">{number}</span>
      <span className="h-px flex-1 bg-[#d9d0c8]" />
      <span>{label}</span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f1ee] px-5 py-8 text-[#1b1a1a] md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1280px]">
        <header className="mb-7 flex items-center gap-3">
          <div className="flex items-center gap-3">
            <VertexMark />
            <span className="font-display text-[2.1rem] leading-none tracking-[-0.05em]">Vertex</span>
          </div>
        </header>

        <div className="mb-7">
          <h1 className="font-display text-[4rem] leading-[0.9] tracking-[-0.06em] text-[#17171a] md:text-[5rem]">
            Design System
          </h1>
        </div>

        <p className="mb-10 max-w-[560px] text-[1.05rem] leading-[1.6] text-[#313131]">
          A unified design language for Vertex learning platform. Clean, modern and focused on clarity,
          consistency and intuitive learning experiences.
        </p>

        <div className="mb-10 grid grid-cols-1 gap-10 xl:grid-cols-12">
          <section className="xl:col-span-7">
            <SectionHeader number="01" label="Colors" />
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4">
              {colorSwatches.slice(0, 4).map((color) => (
                <div key={color.name}>
                  <div className="h-20 rounded-[4px] border border-[#d9d0c8]" style={{ background: color.value }} />
                  <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#241f1d]">
                    {color.name}
                  </div>
                  <div className="text-[10px] tracking-[0.08em] text-[#6a6764]">{color.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4">
              {colorSwatches.slice(4).map((color) => (
                <div key={color.name}>
                  <div className="h-20 rounded-[4px] border border-[#d9d0c8]" style={{ background: color.value }} />
                  <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#241f1d]">
                    {color.name}
                  </div>
                  <div className="text-[10px] tracking-[0.08em] text-[#6a6764]">{color.value}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="xl:col-span-5">
            <SectionHeader number="02" label="Typography" />
            <div className="space-y-4 border-l border-[#d9d0c8] pl-5">
              <div className="font-display text-[4.25rem] leading-[0.9] tracking-[-0.07em]">Ag</div>
              <div className="font-display text-[4.25rem] leading-[0.9] tracking-[-0.07em]">Ag</div>
              <div className="mt-6 grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 text-[12px] text-[#272525]">
                {typeScale.map((item) => (
                  <>
                    <div key={`${item.label}-label`} className="font-medium uppercase tracking-[0.14em] text-[#151515]">
                      {item.label}
                    </div>
                    <div key={`${item.label}-meta`} className="text-right text-[#6f6d6b]">
                      {item.family} · {item.size}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-8 xl:grid-cols-12">
          <section className="xl:col-span-6">
            <SectionHeader number="04" label="Spacing system" />
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#3d3a39]">
                <span>Base unit:</span>
                <span className="font-semibold">4px</span>
              </div>
              <div className="flex items-end gap-3">
                {spacingRows.map((scale) => (
                  <div key={scale.label} className="flex flex-col items-center gap-2">
                    <div
                      className="w-8 bg-[#f0c4a3] border border-[#d7b293]"
                      style={{ height: `${Math.max(scale.amount * 2, 18)}px` }}
                    />
                    <div className="text-center text-[10px] text-[#5d5a57]">
                      <div>{scale.label}</div>
                      <div>{scale.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="xl:col-span-6">
            <SectionHeader number="05" label="Radius & shadows" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1b1b1b]">Radius</div>
                <div className="space-y-3">
                  {radiusValues.map((value) => (
                    <div key={value.label} className="flex items-center gap-3">
                      <div className="h-8 w-8 border border-[#d9d0c8] bg-[#f8ece5]" style={{ borderRadius: value.size }} />
                      <span className="text-sm text-[#4d4a47]">{value.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1b1b1b]">Shadows</div>
                <div className="space-y-3">
                  {shadowValues.map((shadow) => (
                    <div key={shadow.name} className="flex items-center gap-3">
                      <div className="h-10 w-16 rounded-[4px] border border-[#d9d0c8] bg-white" style={{ boxShadow: shadow.values }} />
                      <div>
                        <div className="text-sm font-medium text-[#1f1d1d]">{shadow.name}</div>
                        <div className="text-[10px] text-[#686562]">{shadow.values}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-8 xl:grid-cols-12">
          <section className="xl:col-span-5">
            <SectionHeader number="06" label="Icons" />
            <div className="grid grid-cols-4 gap-4">
              {iconNames.map((icon, index) => (
                <div key={icon} className="flex flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d9d0c8] bg-[#f9f5f1] text-lg text-[#17171a]">
                    {icon.slice(0, 1)}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-[#595552]">
                    {index % 2 === 0 ? "Filled" : "Outline"}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="xl:col-span-3">
            <SectionHeader number="07" label="Buttons" />
            <div className="space-y-3">
              <button className="block w-full rounded-[18px] bg-[#f36a3b] px-4 py-3 text-sm font-medium text-white shadow-[0_2px_8px_rgba(242,106,59,0.3)]">
                Primary
              </button>
              <button className="block w-full rounded-[18px] border border-[#d9d0c8] bg-white px-4 py-3 text-sm font-medium text-[#1f1d1d]">
                Secondary
              </button>
              <button className="block w-full rounded-[18px] border border-[#d9d0c8] bg-[#f9f5f1] px-4 py-3 text-sm font-medium text-[#1f1d1d]">
                Tertiary
              </button>
            </div>
          </section>

          <section className="xl:col-span-4">
            <SectionHeader number="08" label="Inputs" />
            <div className="space-y-3">
              <div className="rounded-[14px] border border-[#d9d0c8] bg-white px-3 py-2 text-sm text-[#3f3d3c] shadow-[0_1px_0_rgba(17,24,39,0.05)]">
                Search anything...
              </div>
              <div className="rounded-[14px] border border-[#d9d0c8] bg-white px-3 py-2 text-sm text-[#3f3d3c]">
                Select
              </div>
              <div className="rounded-[14px] border border-[#d9d0c8] bg-white px-3 py-2 text-sm text-[#3f3d3c]">
                Most relevant
              </div>
            </div>
          </section>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-8 xl:grid-cols-12">
          <section className="xl:col-span-5">
            <SectionHeader number="09" label="Badges / Tags" />
            <div className="flex flex-wrap gap-3">
              {statusBadges.map((badge, index) => (
                <span
                  key={badge}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                    index === 0
                      ? "bg-[#f8eadf] text-[#cf5d20]"
                      : index === 1
                        ? "bg-[#ecf9ed] text-[#2d8f57]"
                        : index === 2
                          ? "bg-[#f6e6dd] text-[#d95e2b]"
                          : "bg-[#f2efee] text-[#5d5a58]"
                  }`}
                >
                  {badge}
                </span>
              ))}
            </div>
          </section>

          <section className="xl:col-span-3">
            <SectionHeader number="10" label="Status / indicators" />
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f36a3b]" />
                <span className="text-sm text-[#1f1d1d]">In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#2d8f57]" />
                <span className="text-sm text-[#1f1d1d]">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d95e2b]" />
                <span className="text-sm text-[#1f1d1d]">Now playing</span>
              </div>
            </div>
          </section>

          <section className="xl:col-span-4">
            <SectionHeader number="11" label="Progress bar" />
            <div className="mt-5">
              <div className="h-3 overflow-hidden rounded-full bg-[#e7e1dc]">
                <div className="h-full w-[35%] rounded-full bg-[#f36a3b]" />
              </div>
              <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#4d4946]">35% complete</div>
            </div>
          </section>
        </div>

        <div className="mb-10">
          <SectionHeader number="12" label="Cards" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {courseCards.map((card) => (
              <article key={card.title} className="rounded-[14px] border border-[#d9d0c8] bg-[#f8f5f2] p-4 shadow-[0_2px_8px_rgba(17,24,39,0.04)]">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#57534e]">{card.kind}</span>
                  <span className="h-3 w-3 rounded-full" style={{ background: card.accent }} />
                </div>
                <h3 className="mb-2 text-[1.5rem] font-semibold leading-tight text-[#191919]">{card.title}</h3>
                <p className="mb-4 text-[0.9rem] leading-[1.5] text-[#4e4a46]">{card.text}</p>
                <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.12em] text-[#5f5a56]">
                  {card.meta.map((meta) => (
                    <span key={meta} className="rounded-full border border-[#d9d0c8] bg-white px-2 py-1">{meta}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 xl:grid-cols-2">
          <section>
            <SectionHeader number="13" label="Navigation" />
            <div className="flex items-center gap-3 border-t border-[#d9d0c8] pt-4">
              <VertexMark />
              <span className="font-display text-[1.7rem] tracking-[-0.05em]">Vertex</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-[#3e3b39]">
              {navItems.map((item, index) => (
                <span key={item} className={index === 1 ? "font-medium text-[#1c1c1c]" : ""}>{item}</span>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader number="14" label="Principles" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-[14px] border border-[#d9d0c8] bg-[#f8f5f2] p-4">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5f5a56]">Clarity first</div>
                <p className="text-[0.85rem] leading-[1.5] text-[#42403d]">Every element should be easy to scan and understand at a glance.</p>
              </div>
              <div className="rounded-[14px] border border-[#d9d0c8] bg-[#f8f5f2] p-4">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5f5a56]">Consistency</div>
                <p className="text-[0.85rem] leading-[1.5] text-[#42403d]">Use a predictable rhythm to make interfaces feel cohesive and familiar.</p>
              </div>
              <div className="rounded-[14px] border border-[#d9d0c8] bg-[#f8f5f2] p-4">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5f5a56]">Focus & calm</div>
                <p className="text-[0.85rem] leading-[1.5] text-[#42403d]">Remove clutter so learners stay oriented and confident while they learn.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
