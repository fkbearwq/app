"use client";

import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const emailAddress = "orcachartergroup@gmail.com";

  const [bookedDates] = useState(new Set());
  const [today, setToday] = useState(() => new Date());
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setToday(new Date());
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  const formatLocalDate = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
      name: form.name?.value || "",
      duration: form.duration?.value || "",
      service: form.service?.value || "",
      date: selectedDate || form.date?.value || "",
      time: selectedTime || form.time?.value || "",
      pickup: form.pickup?.value || "",
      destination: form.destination?.value || "",
      passengers: form.passengers?.value || "",
      phone: form.phone?.value || "",
      notes: form.notes?.value || "",
    };

    if (!data.date) {
      alert("Please select a date.");
      return;
    }

    if (!data.time) {
      alert("Please select a time.");
      return;
    }

    const subject = encodeURIComponent(
      "New Reservation Request - Orca Charter Group"
    );

    const body = encodeURIComponent(
      `New reservation request from website:\n\n` +
        `Guest Name: ${data.name}\n` +
        `Service: ${data.service}\n` +
        `Duration: ${data.duration}\n` +
        `Date: ${data.date}\n` +
        `Time: ${data.time}\n` +
        `Pickup Location: ${data.pickup}\n` +
        `Destination: ${data.destination}\n` +
        `Passengers: ${data.passengers}\n` +
        `Phone: ${data.phone}\n\n` +
        `Notes:\n${data.notes}`
    );

    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };

  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(viewDate);

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const startWeekday = firstDayOfMonth.getDay();
    const calendarStart = new Date(year, month, 1 - startWeekday);
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return Array.from({ length: 42 }, (_, index) => {
      const cellDate = new Date(calendarStart);
      cellDate.setDate(calendarStart.getDate() + index);
      const iso = formatLocalDate(cellDate);
      const isCurrentMonth = cellDate.getMonth() === month;
      const isPast = cellDate < startOfToday;
      const isBooked = bookedDates.has(iso);
      const available = isCurrentMonth && !isPast && !isBooked;

      return {
        iso,
        day: cellDate.getDate(),
        isCurrentMonth,
        isBooked,
        available,
      };
    });
  }, [viewDate, today, bookedDates]);

  const selectedDateLabel = selectedDate
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(`${selectedDate}T12:00:00`))
    : "No date selected";

  const goToPreviousMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const services = [
    {
      title: "Airport Transfer",
      desc: "Private Mercedes Sprinter transfers between SeaTac, downtown Seattle, Bellevue, and nearby destinations.",
    },
    {
      title: "Private Charter",
      desc: "Premium private service with a minimum 4-hour booking, ideal for business travel, events, and customized trips.",
    },
    {
      title: "Private Tours",
      desc: "Custom trips to Mt. Rainier, Olympic National Park, Leavenworth, Snoqualmie Falls, and beyond.",
    },
    {
      title: "Corporate & Group Travel",
      desc: "Reliable premium transportation for conferences, teams, airport pickups, and VIP guests.",
    },
  ];

  const highlights = [
    "Black Mercedes Sprinter fleet",
    "Professional driver-guide service",
    "Seattle airport & hotel transportation",
    "Private charter for 8–14 passengers",
  ];

  const pricing = [
    { name: "Airport Transfer", value: "$160+" },
    { name: "Private Charter", value: "Minimum 4 hours booking" },
    { name: "Extended Day Rate", value: "8–10 hours available" },
    { name: "Overtime", value: "$100 / hour after 10h" },
  ];

  const galleryImages = [
    {
      title: "Seattle Skyline",
      subtitle: "Downtown views and premium city transportation",
      image: "/seattle.png",
    },
    {
      title: "Mercedes Sprinter Fleet",
      subtitle: "Executive Mercedes Sprinter vehicles for private group transportation",
      image: "/sprinter.jpeg",
    },
    {
      title: "SeaTac Transfers",
      subtitle: "Smooth airport pickups with clean, spacious vehicles",
      image: "/seatac.jpeg",
    },
    {
      title: "Mt. Rainier National Park",
      subtitle: "Iconic Pacific Northwest destination for private day tours",
      image: "/rainier-1.png",
    },
    {
      title: "Pacific Northwest Tours",
      subtitle: "Private travel for Seattle, mountains, and scenic routes",
      image: "/northwest.png",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090909] text-[#f7f2e8]">
      <header className="sticky top-0 z-50 border-b border-[#c8a96a]/15 bg-[#090909]/85 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-[#c8a96a]/30 bg-[#111111] p-2 shadow-[0_0_40px_rgba(200,169,106,0.15)]">
              <img
                src="/logo.jpeg"
                alt="Orca Charter Group Logo"
                className="h-14 w-auto object-contain"
              />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#c8a96a]">
                Seattle Premium Charter
              </div>
              <div className="text-xl font-semibold tracking-tight text-white">
                Orca Charter Group
              </div>
            </div>
          </div>

          <nav className="hidden gap-8 text-sm text-[#b8b0a3] md:flex">
            <a href="#services" className="transition hover:text-[#c8a96a]">
              Services
            </a>
            <a href="#pricing" className="transition hover:text-[#c8a96a]">
              Pricing
            </a>
            <a href="#gallery" className="transition hover:text-[#c8a96a]">
              Gallery
            </a>
            <a href="#booking" className="transition hover:text-[#c8a96a]">
              Booking
            </a>
            <a href="#contact" className="transition hover:text-[#c8a96a]">
              Contact
            </a>
          </nav>

          <a
            href="#booking"
            className="rounded-full bg-[#c8a96a] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_12px_38px_rgba(200,169,106,0.25)] transition hover:bg-[#e5cd8f]"
          >
            Book Now
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#090909] text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=80"
            alt="Seattle luxury transportation"
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(200,169,106,0.22),transparent_30%),linear-gradient(90deg,#090909_0%,rgba(9,9,9,0.94)_42%,rgba(9,9,9,0.58)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#090909] to-transparent" />
        </div>

        <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex w-fit rounded-full border border-[#c8a96a]/25 bg-[#c8a96a]/10 px-4 py-1.5 text-xs uppercase tracking-[0.28em] text-[#e5cd8f]">
              Private Chauffeur & Sprinter Service
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-white lg:text-7xl">
              Premium ground transportation in Seattle, built for airport, business, and private travel.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#cfc6b8] lg:text-xl">
              Orca Charter Group delivers refined Mercedes Sprinter service for airport transfers, executive rides, private charters, and curated Pacific Northwest travel.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#booking"
                className="rounded-full bg-[#c8a96a] px-7 py-3 text-sm font-semibold text-black shadow-[0_18px_50px_rgba(200,169,106,0.25)] transition hover:bg-[#e5cd8f]"
              >
                Reserve Your Ride
              </a>
              <a
                href="#gallery"
                className="rounded-full border border-[#c8a96a]/25 bg-white/[0.03] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#c8a96a]/10 hover:text-[#e5cd8f]"
              >
                Explore the Experience
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-sm text-[#e8dfcf] shadow-sm backdrop-blur-sm"
                >
                  <span className="mr-2 text-[#c8a96a]">•</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-end justify-center lg:justify-end">
            <div className="w-full max-w-lg rounded-[2rem] border border-[#c8a96a]/20 bg-white/[0.045] p-6 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl">
              <div className="rounded-[1.75rem] border border-white/10 bg-[#0f0f0f]/85 p-8 text-white">
                <div className="text-xs uppercase tracking-[0.28em] text-[#c8a96a]">
                  Featured Service
                </div>
                <div className="mt-3 text-3xl font-semibold">
                  Executive Airport Transfers
                </div>
                <p className="mt-4 max-w-md text-[#cfc6b8]">
                  Direct premium transportation between SeaTac, downtown Seattle, Bellevue, luxury hotels, and private destinations.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#c8a96a]/20 bg-[#c8a96a]/10 p-5">
                    <div className="text-sm text-[#d6c08a]">Starting From</div>
                    <div className="mt-2 text-3xl font-semibold">$160+</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="text-sm text-[#b8b0a3]">Minimum Charter</div>
                    <div className="mt-2 text-3xl font-semibold">4 Hours</div>
                  </div>
                </div>
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-[#cfc6b8]">
                  Designed for hotel guests, executive travelers, wedding transportation, airport pickups, and private group bookings.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f4efe6] py-24 text-[#151515]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="text-sm uppercase tracking-[0.28em] text-[#9b7b3f]">
              Services
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#111111] lg:text-5xl">
              Refined transportation for every part of the journey.
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#5f5a52]">
              Built for travelers who expect clean vehicles, clear communication, and a premium booking experience.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-[2rem] border border-[#dfd3c0] bg-[#fbf8f1] p-8 shadow-[0_18px_55px_rgba(44,38,28,0.08)] transition hover:-translate-y-1 hover:border-[#c8a96a] hover:shadow-xl"
              >
                <div className="text-xl font-semibold tracking-tight text-[#111111]">
                  {service.title}
                </div>
                <p className="mt-4 text-sm leading-7 text-[#645e55]">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-[#f4efe6] py-24 text-[#151515]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <div className="text-sm uppercase tracking-[0.28em] text-[#9b7b3f]">
                Pricing
              </div>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#111111] lg:text-5xl">
                Clear pricing, elevated presentation.
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-[#5f5a52]">
                Starting rates are presented simply, while custom itineraries and event transportation receive tailored quotes.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#c8a96a]/25 bg-[#0f0f0f] p-6 shadow-[0_25px_90px_rgba(0,0,0,0.22)]">
              <div className="space-y-4">
                {pricing.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-4"
                  >
                    <span className="text-sm text-[#cfc6b8]">{item.name}</span>
                    <span className="text-lg font-semibold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-[#a9a092]">
                Contact us for wedding transportation, executive travel, hotel partnerships, airport groups, and multi-day private service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#f4efe6] px-6 py-20 text-[#151515] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 rounded-[2rem] border border-[#dfd3c0] bg-[#fbf8f1] p-8 shadow-[0_18px_55px_rgba(44,38,28,0.08)] lg:grid-cols-2 lg:p-12">
            <div>
              <div className="text-sm uppercase tracking-[0.28em] text-[#9b7b3f]">
                About
              </div>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#111111]">
                A cleaner, more premium charter experience in Seattle.
              </h2>
            </div>
            <div className="space-y-5 leading-8 text-[#5f5a52]">
              <p>
                Orca Charter Group focuses on high-quality Mercedes Sprinter
                transportation with a minimalist luxury feel. We serve airport
                transfers, city rides, private tours, and group travel with a calm,
                professional service standard.
              </p>
              <p>
                Whether you need a smooth transfer from SeaTac, a private vehicle for
                a Seattle itinerary, or an executive group shuttle, we help make the
                trip simple, polished, and reliable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-[#090909] py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="text-sm uppercase tracking-[0.28em] text-[#c8a96a]">
              Gallery
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight lg:text-5xl">
              The look and feel of premium Seattle transportation.
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#cfc6b8]">
              A more visual presentation for airport service, executive travel, and Pacific Northwest experiences.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {galleryImages.map((item, index) => (
              <div
                key={item.title}
                className={`group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] ${index === 0 ? "md:col-span-2" : ""}`}
              >
                <div className={`${index === 0 ? "aspect-[21/8]" : "aspect-[16/10]"} relative w-full overflow-hidden`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                    <div className="text-2xl font-semibold tracking-tight lg:text-3xl">{item.title}</div>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#e8dfcf] lg:text-base">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="bg-[#f4efe6] py-20 text-[#151515]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <div className="text-sm uppercase tracking-[0.28em] text-[#9b7b3f]">
                Online Booking
              </div>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#111111]">
                Reserve your trip online and check available dates.
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-[#5f5a52]">
                Guests can choose a service, select a preferred date and time,
                and send a reservation request directly by email.
              </p>

              <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-[2rem] border border-[#dfd3c0] bg-[#fbf8f1] p-6 shadow-[0_18px_55px_rgba(44,38,28,0.08)]">
                  <div className="flex items-center justify-between">
                    <div className="text-sm uppercase tracking-[0.2em] text-[#9b7b3f]">
                      Available Dates
                    </div>
                    <div className="text-xs text-[#8a8175]">Calendar View</div>
                  </div>

                  <div className="mt-5 rounded-[1.5rem] border border-[#e6dccb] bg-white/50 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={goToPreviousMonth}
                        className="rounded-full border border-[#dfd3c0] px-3 py-1 text-sm text-[#5f5a52] transition hover:border-[#c8a96a] hover:text-[#9b7b3f]"
                      >
                        ←
                      </button>
                      <div className="text-base font-semibold text-[#111111]">{monthLabel}</div>
                      <button
                        type="button"
                        onClick={goToNextMonth}
                        className="rounded-full border border-[#dfd3c0] px-3 py-1 text-sm text-[#5f5a52] transition hover:border-[#c8a96a] hover:text-[#9b7b3f]"
                      >
                        →
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium uppercase tracking-[0.16em] text-[#8a8175]">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <div key={day} className="py-2">
                            {day}
                          </div>
                        )
                      )}
                    </div>

                    <div className="mt-2 grid grid-cols-7 gap-2">
                      {calendarDays.map((mappedDate) => (
                        <button
                          key={mappedDate.iso}
                          type="button"
                          disabled={!mappedDate.available}
                          onClick={() => setSelectedDate(mappedDate.iso)}
                          className={`aspect-square flex items-center justify-center rounded-xl border text-sm font-medium transition ${
                            !mappedDate.isCurrentMonth
                              ? "cursor-default border-[#eee5d8] bg-[#f5eee4] text-[#c3b7a6]"
                              : mappedDate.isBooked
                              ? "cursor-not-allowed border-[#eee5d8] bg-[#f0e8dc] text-[#b7aa99]"
                              : mappedDate.available && selectedDate === mappedDate.iso
                              ? "border-[#c8a96a] bg-[#c8a96a] text-black shadow-[0_0_22px_rgba(200,169,106,0.3)]"
                              : mappedDate.available
                              ? "border-[#dfd3c0] bg-white text-[#4c463f] hover:border-[#c8a96a] hover:text-[#9b7b3f]"
                              : "cursor-not-allowed border-[#eee5d8] bg-[#f0e8dc] text-[#b7aa99]"
                          }`}
                        >
                          {mappedDate.day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-[#dfd3c0] bg-[#fbf8f1] p-6 shadow-[0_18px_55px_rgba(44,38,28,0.08)]">
                  <div className="flex items-center justify-between">
                    <div className="text-sm uppercase tracking-[0.2em] text-[#9b7b3f]">
                      Preferred Time
                    </div>
                    <div className="text-xs text-[#8a8175]">Custom Time</div>
                  </div>

                  <div className="mt-5 rounded-[1.5rem] border border-[#e6dccb] bg-white/50 p-4">
                    <label className="mb-3 block text-sm font-medium text-[#4c463f]">
                      Guests can choose any time
                    </label>
                    <input
                      name="time"
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="h-16 w-full rounded-xl border border-[#dfd3c0] bg-white px-4 text-base font-medium text-[#111111] outline-none transition focus:border-[#c8a96a]"
                    />
                    <p className="mt-3 text-xs leading-6 text-[#6f685f]">
                      Choose any available departure time that fits your schedule.
                    </p>
                    <div className="mt-4 rounded-xl border border-[#e6dccb] bg-[#f4efe6] p-4 text-sm text-[#5f5a52]">
                      <div className="font-medium text-[#111111]">Selected date</div>
                      <div className="mt-1">{selectedDateLabel}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#dfd3c0] bg-[#fbf8f1] p-8 shadow-[0_18px_55px_rgba(44,38,28,0.08)]">
              <div className="text-sm uppercase tracking-[0.2em] text-[#9b7b3f]">
                Reservation Form
              </div>

              <form onSubmit={handleReservationSubmit} className="mt-6 grid gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#4c463f]">
                    Service Type
                  </label>
                  <select
                    name="service"
                    className="w-full rounded-2xl border border-[#dfd3c0] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition focus:border-[#c8a96a]"
                  >
                    <option>Airport Transfer</option>
                    <option>Private Charter</option>
                    <option>Private Tour</option>
                    <option>Join Small Group Tour</option>
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#4c463f]">
                      Preferred Date
                    </label>
                    <input
                      name="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full rounded-2xl border border-[#dfd3c0] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition focus:border-[#c8a96a]"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#4c463f]">
                      Preferred Time
                    </label>
                    <input
                      name="time"
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full rounded-2xl border border-[#dfd3c0] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition focus:border-[#c8a96a]"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#4c463f]">
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      name="pickup"
                      placeholder="Seattle hotel / airport / address"
                      className="w-full rounded-2xl border border-[#dfd3c0] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition placeholder:text-[#9b9183] focus:border-[#c8a96a]"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#4c463f]">
                      Destination
                    </label>
                    <input
                      type="text"
                      name="destination"
                      placeholder="Destination"
                      className="w-full rounded-2xl border border-[#dfd3c0] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition placeholder:text-[#9b9183] focus:border-[#c8a96a]"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#4c463f]">
                      Passenger Count
                    </label>
                    <input
                      name="passengers"
                      type="number"
                      min="1"
                      max="15"
                      placeholder="Number of passengers"
                      className="w-full rounded-2xl border border-[#dfd3c0] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition placeholder:text-[#9b9183] focus:border-[#c8a96a]"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#4c463f]">
                      Guest Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Full name"
                      className="w-full rounded-2xl border border-[#dfd3c0] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition placeholder:text-[#9b9183] focus:border-[#c8a96a]"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#4c463f]">
                      Trip Duration
                    </label>
                    <select
                      name="duration"
                      className="w-full rounded-2xl border border-[#dfd3c0] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition focus:border-[#c8a96a]"
                    >
                      <option value="">Select duration</option>
                      <option value="1 hour">1 hour</option>
                      <option value="2 hours">2 hours</option>
                      <option value="3 hours">3 hours</option>
                      <option value="4 hours">4 hours</option>
                      <option value="5 hours">5 hours</option>
                      <option value="6 hours">6 hours</option>
                      <option value="7 hours">7 hours</option>
                      <option value="8 hours">8 hours</option>
                      <option value="9 hours">9 hours</option>
                      <option value="10 hours">10 hours</option>
                      <option value="Full Day">Full Day</option>
                      <option value="Multi-Day">Multi-Day</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#4c463f]">
                      Contact Phone
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Your phone number"
                      className="w-full rounded-2xl border border-[#dfd3c0] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition placeholder:text-[#9b9183] focus:border-[#c8a96a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#4c463f]">
                    Special Request
                  </label>
                  <textarea
                    name="notes"
                    rows={4}
                    placeholder="Trip details, luggage, child seat, custom itinerary, or notes"
                    className="w-full rounded-2xl border border-[#dfd3c0] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition placeholder:text-[#9b9183] focus:border-[#c8a96a]"
                  />
                </div>

                <div className="rounded-2xl border border-[#dfd3c0] bg-[#f4efe6] p-5">
                  <div className="flex items-center justify-between text-sm text-[#5f5a52]">
                    <span>Booking Request</span>
                    <span className="font-semibold text-[#9b7b3f]">By Email</span>
                  </div>
                  <div className="mt-2 text-xs leading-6 text-[#6f685f]">
                    After clicking submit, your email app will open with your booking
                    details pre-filled. Please send the email to complete your request.
                  </div>
                </div>

                <button className="rounded-2xl bg-[#c8a96a] px-6 py-3 text-sm font-semibold text-black shadow-[0_12px_38px_rgba(200,169,106,0.25)] transition hover:bg-[#e5cd8f]">
                  Send Booking Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#090909] pb-24 pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="rounded-[2rem] border border-[#c8a96a]/20 bg-[#0f0f0f] px-8 py-12 text-white shadow-[0_25px_90px_rgba(0,0,0,0.35)] lg:px-12 lg:py-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <div className="text-sm uppercase tracking-[0.28em] text-[#c8a96a]">
                  Contact
                </div>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight">
                  Ready to book your next ride?
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-8 text-[#cfc6b8]">
                  Tell us your pickup location, destination, date, passenger count,
                  and timing. We’ll get back to you with a custom quote.
                </p>
              </div>
              <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-sm">
                <div>
                  <div className="text-[#a9a092]">Company</div>
                  <div className="mt-1 text-base font-medium text-white">
                    Orca Charter Group
                  </div>
                </div>
                <div>
                  <div className="text-[#a9a092]">Phone</div>
                  <div className="mt-1 text-base font-medium text-white">
                    (206) 422-5336
                  </div>
                </div>
                <div>
                  <div className="text-[#a9a092]">Email</div>
                  <div className="mt-1 text-base font-medium text-white">
                    orcachartergroup@gmail.com
                  </div>
                </div>
                <div>
                  <div className="text-[#a9a092]">Service Area</div>
                  <div className="mt-1 text-base font-medium text-white">
                    Seattle · Bellevue · SeaTac · Pacific Northwest
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tours" className="bg-[#f4efe6] py-20 text-[#151515]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="text-sm uppercase tracking-[0.28em] text-[#9b7b3f]">
              Seattle National Park Tours
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#111111]">
              Explore the most iconic national parks near Seattle.
            </h2>
            <p className="mt-4 text-lg text-[#5f5a52]">
              Join our professionally guided trips to the Pacific Northwest&apos;s
              most beautiful landscapes. You can book a private charter or join a
              shared small-group tour.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[2rem] border border-[#dfd3c0] bg-[#fbf8f1] p-7 shadow-[0_18px_55px_rgba(44,38,28,0.08)]">
              <div className="text-xl font-semibold text-[#111111]">Mt. Rainier National Park</div>
              <p className="mt-3 text-sm leading-7 text-[#5f5a52]">
                A classic full-day trip from Seattle featuring scenic highlights
                such as Longmire, waterfalls, Paradise, and seasonal viewpoints.
              </p>
              <div className="mt-4 text-sm text-[#9b7b3f]">
                Sample Join Tour Price: From $148 / adult
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#dfd3c0] bg-[#fbf8f1] p-7 shadow-[0_18px_55px_rgba(44,38,28,0.08)]">
              <div className="text-xl font-semibold text-[#111111]">Olympic National Park</div>
              <p className="mt-3 text-sm leading-7 text-[#5f5a52]">
                Travel from Seattle by scenic ferry route and explore mountain and
                lake highlights in Olympic National Park.
              </p>
              <div className="mt-4 text-sm text-[#9b7b3f]">
                Sample Join Tour Price: From $148 / adult
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#dfd3c0] bg-[#fbf8f1] p-7 shadow-[0_18px_55px_rgba(44,38,28,0.08)]">
              <div className="text-xl font-semibold text-[#111111]">Leavenworth Day Trip</div>
              <p className="mt-3 text-sm leading-7 text-[#5f5a52]">
                Visit Washington&apos;s Bavarian-style mountain village for alpine
                views, shopping, festivals, and charming downtown streets.
              </p>
              <div className="mt-4 text-sm text-[#9b7b3f]">Duration: Full Day</div>
            </div>

            <div className="rounded-[2rem] border border-[#dfd3c0] bg-[#fbf8f1] p-7 shadow-[0_18px_55px_rgba(44,38,28,0.08)]">
              <div className="text-xl font-semibold text-[#111111]">
                Snoqualmie Falls &amp; Scenic Waterfalls
              </div>
              <p className="mt-3 text-sm leading-7 text-[#5f5a52]">
                A relaxed scenic route featuring Snoqualmie Falls and nearby forest
                or waterfall stops.
              </p>
              <div className="mt-4 text-sm text-[#9b7b3f]">Half Day or Full Day</div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-[#dfd3c0] bg-[#fbf8f1] p-8 shadow-[0_18px_55px_rgba(44,38,28,0.08)]">
              <div className="text-xl font-semibold text-[#111111]">
                Olympic National Park Sample Itinerary
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-[#5f5a52]">
                <li>• Morning departure from Seattle</li>
                <li>• Scenic Bainbridge Island ferry crossing</li>
                <li>• Hood Canal area</li>
                <li>• Enter Olympic National Park</li>
                <li>• Mountain viewpoint stop</li>
                <li>• Lake stop</li>
                <li>• Return to Seattle by evening</li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-[#dfd3c0] bg-[#fbf8f1] p-8 shadow-[0_18px_55px_rgba(44,38,28,0.08)]">
              <div className="text-xl font-semibold text-[#111111]">
                Mt. Rainier Sample Itinerary
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-[#5f5a52]">
                <li>• Morning departure from Seattle</li>
                <li>• Enter Mount Rainier National Park</li>
                <li>• Historic area stop</li>
                <li>• Waterfall viewpoints</li>
                <li>• Paradise area</li>
                <li>• Seasonal lake photo stop</li>
                <li>• Return to Seattle in the evening</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 grid gap-10 rounded-[2rem] border border-[#dfd3c0] bg-[#fbf8f1] p-10 shadow-[0_18px_55px_rgba(44,38,28,0.08)] lg:grid-cols-2">
            <div>
              <div className="text-xl font-semibold text-[#111111]">Private Charter Option</div>
              <p className="mt-4 leading-7 text-[#5f5a52]">
                Book a private trip with your own group and customize the itinerary,
                departure time, and sightseeing stops.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[#5f5a52]">
                <li>• Flexible itinerary</li>
                <li>• Hotel pickup in Seattle or Bellevue</li>
                <li>• Ideal for families and private groups</li>
              </ul>
            </div>

            <div>
              <div className="text-xl font-semibold text-[#111111]">Join a Small Group Tour</div>
              <p className="mt-4 leading-7 text-[#5f5a52]">
                Travelers can also join shared departures. This option is more
                affordable and a great way to meet other travelers.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[#5f5a52]">
                <li>• Fixed daily departures</li>
                <li>• Small group experience</li>
                <li>• Professional driver-guide included</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 rounded-[2rem] border border-[#dfd3c0] bg-[#fbf8f1] p-8 text-sm text-[#5f5a52] shadow-[0_18px_55px_rgba(44,38,28,0.08)]">
            Transportation for national park tours is provided by our comfortable
            <span className="font-semibold text-[#111111]"> Mercedes Sprinter/Ford Transit 350 </span>, designed for
            premium small-group travel with spacious seating and large windows for
            scenic views.
          </div>
        </div>
      </section>
    </div>
  );
}
