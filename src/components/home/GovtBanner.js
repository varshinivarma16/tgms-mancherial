import { pick } from "@/lib/i18n";

// Government of Telangana strip in the national flag colours:
// Director and Additional Director on saffron, logo on white, Chief Minister on green.
// Names, titles and photos come from Settings.
function Person({ name, title, photo, reverse, className = "" }) {
  if (!name) return null;
  return (
    <div className={`flex items-center gap-3 px-3 py-2 sm:px-6 ${reverse ? "flex-row-reverse text-right" : ""} ${className}`}>
      {photo && <img src={photo} alt={name} className="h-12 w-11 shrink-0 rounded-md border-2 border-white bg-white object-cover object-top shadow sm:h-16 sm:w-14" />}
      <div className="min-w-0">
        <p className="text-sm font-bold leading-tight sm:text-lg">{name}</p>
        <p className="hidden text-xs sm:block sm:text-sm">{title}</p>
      </div>
    </div>
  );
}

export default function GovtBanner({ settings, lang }) {
  const logo = settings.campaign_logo || "/images/telangana-emblem.png";

  return (
    <section className="grid grid-cols-[1fr_auto_1fr] items-stretch">
      <div className="flex flex-wrap items-center bg-[#FF9933] text-[#1f2937] lg:flex-nowrap">
        <Person name={pick(settings, "director_name", lang)} title={pick(settings, "director_title", lang)} photo={settings.director_photo} />
        <Person name={pick(settings, "addl_director_name", lang)} title={pick(settings, "addl_director_title", lang)} photo={settings.addl_director_photo} />
      </div>
      <div className="flex flex-col items-center justify-center bg-white px-3 py-1 sm:px-10">
        <img src={logo} alt="" className="h-9 w-9 object-contain sm:h-12 sm:w-12" />
        <p className="hidden text-center text-sm font-bold text-primary-dark sm:block sm:text-base">{pick(settings, "govt_name", lang)}</p>
      </div>
      <Person
        name={pick(settings, "cm_name", lang)}
        title={pick(settings, "cm_title", lang)}
        photo={settings.cm_photo}
        reverse
        className="bg-[#138808] text-white"
      />
    </section>
  );
}
