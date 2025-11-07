import { Database, LayoutDashboard, Boxes, Settings as SettingsIcon, Zap } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: '대시보드' },
    { id: 'datasets', icon: Database, label: '데이터셋' },
    { id: 'vectors', icon: Boxes, label: '벡터 관리' },
    { id: 'settings', icon: SettingsIcon, label: '설정' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div>RAG Platform</div>
            <div className="text-gray-500 text-sm">v1.0.0</div>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => onPageChange(item.id)}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-900">💡 Tip</div>
          <div className="text-xs text-blue-700 mt-1">
            임베딩 품질 향상을 위해 데이터를 정기적으로 업데이트하세요
          </div>
        </div>
      </div>
    </aside>
  );
}
