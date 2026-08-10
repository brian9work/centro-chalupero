export default function Footer() {
  return (
    <footer>
      <div
        className="text-white"
        style={{ backgroundColor: "rgb(37, 99, 235)" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Tu restaurante merece estar online
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Crea tu menu digital hoy y empeza a recibir pedidos sin
            complicaciones.
          </p>
          <a
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-base font-medium transition-opacity hover:opacity-90"
            href="https://wa.me/527491086498"
            style={{ color: "rgb(37, 99, 235)" }}
          >
            Crear mi menu
          </a>
        </div>
      </div>
      <div className="border-t border-slate-100 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
          <div>
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              RestaurantOS
            </span>
            <p className="mt-2 text-sm text-slate-500">
              La plataforma para restaurantes
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Contacto
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-message-circle h-4 w-4 text-slate-400"
                  aria-hidden="true"
                >
                  <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
                </svg>
                <a
                  href="https://wa.me/527491086498"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Enlaces
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <a className="hover:text-slate-900" href="/">
                  Inicio
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 py-6 text-center text-xs text-slate-400">
          © 2026 RestaurantOS. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
