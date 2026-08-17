(() => {
    const menuToggle = document.getElementById("menuToggle");
    const menu = document.getElementById("menu");

    if (menuToggle && menu) {
        const closeMenu = () => {
            menu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        };

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka menu navigasi");

        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();
            const isOpen = menu.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        menu.addEventListener("click", (event) => event.stopPropagation());
        document.addEventListener("click", closeMenu);
        window.addEventListener("resize", () => {
            if (window.innerWidth > 720) closeMenu();
        });
    }

    window.msanet = {
        formatDate(value) {
            if (!value) return "-";
            const date = new Date(`${value}T00:00:00`);
            if (Number.isNaN(date.getTime())) return value;
            return new Intl.DateTimeFormat("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }).format(date);
        },

        async loadContent() {
            const response = await fetch("data/content.json", { cache: "no-store" });
            if (!response.ok) throw new Error("Gagal memuat data konten");
            const data = await response.json();
            return Array.isArray(data) ? data : [];
        },

        createArticleCard(item) {
            const article = document.createElement("article");
            article.className = "card article-card";

            const category = document.createElement("span");
            category.className = "category-badge";
            category.textContent = item.category || "Umum";

            const title = document.createElement("h3");
            title.textContent = item.title || "Tanpa judul";

            const meta = document.createElement("div");
            meta.className = "meta-row";
            const date = document.createElement("span");
            date.className = "meta-pill";
            date.innerHTML = '<i class="fa-regular fa-calendar"></i>';
            date.append(document.createTextNode(` ${window.msanet.formatDate(item.date)}`));
            meta.appendChild(date);

            const excerpt = document.createElement("p");
            excerpt.textContent = item.excerpt || "Belum ada ringkasan untuk artikel ini.";

            const link = document.createElement("a");
            link.className = "read-more";
            link.href = `detail.html?id=${encodeURIComponent(item.id)}`;
            link.innerHTML = 'Baca selengkapnya <i class="fa-solid fa-arrow-right"></i>';

            article.append(category, title, meta, excerpt, link);
            return article;
        }
    };
})();
