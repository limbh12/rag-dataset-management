import { BarChart3, Database, FileText, TrendingUp, Upload, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';

interface DashboardProps {
  onViewDataset: (id: string) => void;
}

const vectorData = [
  { month: '1월', vectors: 45000 },
  { month: '2월', vectors: 52000 },
  { month: '3월', vectors: 61000 },
  { month: '4월', vectors: 58000 },
  { month: '5월', vectors: 70000 },
  { month: '6월', vectors: 85000 },
];

const qualityData = [
  { name: '문서 A', quality: 95 },
  { name: '문서 B', quality: 88 },
  { name: '문서 C', quality: 92 },
  { name: '문서 D', quality: 78 },
  { name: '문서 E', quality: 85 },
];

const recentDatasets = [
  { id: '1', name: 'Product Documentation', vectors: 12500, updated: '2시간 전', status: 'active' },
  { id: '2', name: 'Customer Support KB', vectors: 8200, updated: '5시간 전', status: 'active' },
  { id: '3', name: 'Technical Specs', vectors: 15600, updated: '1일 전', status: 'processing' },
  { id: '4', name: 'Marketing Content', vectors: 6800, updated: '2일 전', status: 'active' },
];

export function Dashboard({ onViewDataset }: DashboardProps) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="mb-6">RAG 데이터셋 관리</div>
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="데이터셋, 문서, 벡터 검색..." 
              className="pl-10"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Upload className="w-4 h-4" />
                새 데이터셋 업로드
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>새 데이터셋 생성</DialogTitle>
                <DialogDescription>
                  새로운 데이터셋을 생성하고 문서를 업로드하여 벡터 임베딩을 시작합니다.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* 기본 정보 */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dataset-name">데이터셋 이름 *</Label>
                    <Input 
                      id="dataset-name" 
                      placeholder="예: Customer FAQ" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dataset-desc">설명</Label>
                    <Textarea 
                      id="dataset-desc" 
                      placeholder="데이터셋에 대한 설명을 입력하세요"
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                {/* 임베딩 설정 */}
                <div className="space-y-4">
                  <div className="text-sm">임베딩 설정</div>
                  <div className="space-y-2">
                    <Label htmlFor="embedding-model">임베딩 모델</Label>
                    <Select defaultValue="ada-002">
                      <SelectTrigger id="embedding-model">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ada-002">text-embedding-ada-002 (권장)</SelectItem>
                        <SelectItem value="3-small">text-embedding-3-small</SelectItem>
                        <SelectItem value="3-large">text-embedding-3-large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="chunk-size">청크 크기</Label>
                      <Select defaultValue="512">
                        <SelectTrigger id="chunk-size">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="256">256 토큰</SelectItem>
                          <SelectItem value="512">512 토큰 (기본)</SelectItem>
                          <SelectItem value="1024">1024 토큰</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chunk-overlap">청크 오버랩</Label>
                      <Select defaultValue="50">
                        <SelectTrigger id="chunk-overlap">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20">20 토큰</SelectItem>
                          <SelectItem value="50">50 토큰 (기본)</SelectItem>
                          <SelectItem value="100">100 토큰</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* 파일 업로드 */}
                <div className="space-y-2">
                  <Label>파일 업로드</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer">
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-600 mb-1">
                      클릭하여 파일을 선택하거나 드래그하여 업로드
                    </div>
                    <div className="text-xs text-gray-500">
                      PDF, TXT, DOCX, MD 파일 지원 (최대 100MB)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <input type="checkbox" id="auto-generate" defaultChecked className="rounded" />
                  <label htmlFor="auto-generate" className="text-sm text-blue-900 cursor-pointer">
                    업로드 후 자동으로 벡터 생성 시작
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1">취소</Button>
                <Button className="flex-1 gap-2">
                  <Upload className="w-4 h-4" />
                  생성하기
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">전체 데이터셋</CardTitle>
            <Database className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">24</div>
            <div className="text-xs text-gray-500 mt-1">+3 지난 달</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">총 벡터 수</CardTitle>
            <BarChart3 className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">85,342</div>
            <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +21.3% 증가
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">문서 수</CardTitle>
            <FileText className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">1,248</div>
            <div className="text-xs text-gray-500 mt-1">+156 이번 주</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">평균 품질 점수</CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">87.6%</div>
            <div className="text-xs text-green-600 mt-1">우수</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>벡터 생성 추이</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={vectorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line type="monotone" dataKey="vectors" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>데이터 품질 분석</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={qualityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="quality" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>최근 데이터셋</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDatasets.map((dataset) => (
              <div 
                key={dataset.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onViewDataset(dataset.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Database className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div>{dataset.name}</div>
                    <div className="text-sm text-gray-500">
                      {dataset.vectors.toLocaleString()} 벡터 · 업데이트: {dataset.updated}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    dataset.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {dataset.status === 'active' ? '활성' : '처리중'}
                  </span>
                  <Button variant="ghost" size="sm">
                    보기
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}