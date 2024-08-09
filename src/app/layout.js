import Sidebar from './components/Sidebar';
import './globals.css';

export const metadata = {
  title: 'Horario Yamboro',
  description: 'Gestión de horarios y ambientes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
