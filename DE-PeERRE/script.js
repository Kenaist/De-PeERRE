document.addEventListener("DOMContentLoaded", () => {
    // Navegación móvil
    const navToggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("nav-principal");

    if (navToggle && nav) {
        navToggle.addEventListener("click", () => {
            const expanded = navToggle.getAttribute("aria-expanded") === "true";
            navToggle.setAttribute("aria-expanded", String(!expanded));
            nav.classList.toggle("nav-abierta");
        });
    }

    // Desplazamiento suave y cerrar menú al hacer clic
    document.querySelectorAll('a[href^="#"]').forEach((enlace) => {
        enlace.addEventListener("click", (evento) => {
            const destinoId = enlace.getAttribute("href");
            if (!destinoId || destinoId === "#") return;

            const destino = document.querySelector(destinoId);
            if (destino) {
                evento.preventDefault();
                destino.scrollIntoView({ behavior: "smooth", block: "start" });

                if (nav && navToggle) {
                    nav.classList.remove("nav-abierta");
                    navToggle.setAttribute("aria-expanded", "false");
                }
            }
        });
    });

    // Filtro de destinos (tarjetas y sección de guías)
    const filterButtons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".destino-card");
    const guias = document.querySelectorAll(".guia-destino");

    if (filterButtons.length && cards.length) {
        filterButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const filtro = btn.dataset.filter || "todos";

                // Botón activo
                filterButtons.forEach((b) => b.classList.remove("activo"));
                btn.classList.add("activo");

                // Tarjetas de destinos
                cards.forEach((card) => {
                    const categoria = card.dataset.category;
                    if (filtro === "todos" || categoria === filtro) {
                        card.style.display = "flex";
                    } else {
                        card.style.display = "none";
                    }
                });

                // Guías de "cómo llegar"
                if (guias.length) {
                    guias.forEach((guia) => {
                        const categoriaGuia = guia.dataset.category || "";
                        if (filtro === "todos" || categoriaGuia === filtro) {
                            guia.style.display = "block";
                        } else {
                            guia.style.display = "none";
                        }
                    });
                }
            });
        });
    }

    // Al hacer clic en una tarjeta, filtrar por su categoría y bajar a su guía
    if (cards.length) {
        cards.forEach((card) => {
            const categoria = card.dataset.category;
            const destinoSlug = card.dataset.destino;

            const irAGuia = () => {
                // Activar filtro correcto
                if (categoria) {
                    const btnCategoria = document.querySelector(`.filter-btn[data-filter="${categoria}"]`);
                    if (btnCategoria) {
                        btnCategoria.click();
                    }
                }

                // Buscar guía correspondiente
                if (destinoSlug) {
                    const guiaDestino = document.querySelector(`.guia-destino[data-destino="${destinoSlug}"]`);
                    if (guiaDestino) {
                        guiaDestino.scrollIntoView({ behavior: "smooth", block: "start" });
                        return;
                    }
                }

                // Si no se encontró guía, bajar a la sección general
                const seccionGuias = document.getElementById("guias");
                if (seccionGuias) {
                    seccionGuias.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            };

            card.addEventListener("click", () => {
                irAGuia();
            });

            card.addEventListener("keydown", (evento) => {
                if (evento.key === "Enter" || evento.key === " ") {
                    evento.preventDefault();
                    irAGuia();
                }
            });
        });
    }

    // Manejo del formulario de contacto (disimulado)
    const form = document.getElementById("form-contacto");
    const mensajeEstado = document.getElementById("mensaje-estado");

    if (form && mensajeEstado) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = form.nombre.value.trim();
            const correo = form.correo.value.trim();
            const mensaje = form.mensaje.value.trim();

            if (!nombre || !correo || !mensaje) {
                mensajeEstado.textContent = "Por favor, completa todos los campos obligatorios.";
                mensajeEstado.classList.remove("exito");
                mensajeEstado.classList.add("error");
                return;
            }

            const correoValido = /\S+@\S+\.\S+/.test(correo);
            if (!correoValido) {
                mensajeEstado.textContent = "Por favor, escribe un correo electrónico válido.";
                mensajeEstado.classList.remove("exito");
                mensajeEstado.classList.add("error");
                return;
            }

            mensajeEstado.textContent = "¡Gracias! Tu mensaje ha sido registrado (simulación).";
            mensajeEstado.classList.remove("error");
            mensajeEstado.classList.add("exito");
            form.reset();
        });
    }

    // Botón "volver arriba"
    const btnArriba = document.getElementById("btn-arriba");
    if (btnArriba) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                btnArriba.classList.add("visible");
            } else {
                btnArriba.classList.remove("visible");
            }
        });

        btnArriba.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Año actual en el footer
    const spanAnio = document.getElementById("anio-actual");
    if (spanAnio) {
        spanAnio.textContent = String(new Date().getFullYear());
    }
});

const btn = document.getElementById("hamburger-btn");
const nav = document.querySelector("nav");

btn.addEventListener("click", () => {
    nav.classList.toggle("active");
});
