export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-bold mb-2">Smaller Links</h3>
            <p className="text-gray-400 text-sm">
              El acortador de URLs más simple y efectivo para tus necesidades.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-400 hover:text-white transition">Inicio</a></li>
              <li><a href="/login" className="text-gray-400 hover:text-white transition">Login</a></li>
              <li><a href="/profile" className="text-gray-400 hover:text-white transition">Mi Perfil</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Contacto</h3>
            <p className="text-gray-400 text-sm">
              ¿Tienes preguntas? Contáctanos en:<br />
              <a href="mailto:info@smallerlinks.com" className="text-indigo-400 hover:text-indigo-300">
                info@smallerlinks.com
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          <p>© 2026 Smaller Links. Hecho con ❤️ para la comunidad.</p>
        </div>
      </div>
    </footer>
  );
}
