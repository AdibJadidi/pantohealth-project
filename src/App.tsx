import MainContent from "./components/MainContent";
import "./index.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow ">
        <div className="max-w-7xl mx-auto">
          <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
            PantoHealth
          </div>
        </div>
      </header>
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <MainContent />
      </main>
      <footer className="bg-white shadow-[0_0_20px] shadow-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <span>PantoHealth</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
