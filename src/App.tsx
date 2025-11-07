import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { DatasetList } from './components/DatasetList';
import { DatasetDetail } from './components/DatasetDetail';
import { VectorManagement } from './components/VectorManagement';
import { Settings } from './components/Settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);

  const renderPage = () => {
    if (selectedDataset) {
      return (
        <DatasetDetail 
          datasetId={selectedDataset} 
          onBack={() => setSelectedDataset(null)} 
        />
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onViewDataset={(id) => setSelectedDataset(id)} />;
      case 'datasets':
        return <DatasetList onSelectDataset={(id) => setSelectedDataset(id)} />;
      case 'vectors':
        return <VectorManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onViewDataset={(id) => setSelectedDataset(id)} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}
