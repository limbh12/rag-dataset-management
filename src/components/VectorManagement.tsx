import { Search, Filter, RefreshCw, Download, Upload, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

const vectorSpaces = [
  { 
    id: '1', 
    name: 'Main Knowledge Base', 
    vectors: 45600, 
    dimension: 1536, 
    model: 'ada-002',
    usage: 76,
    status: 'healthy' 
  },
  { 
    id: '2', 
    name: 'Customer Support', 
    vectors: 28400, 
    dimension: 1536, 
    model: 'ada-002',
    usage: 54,
    status: 'healthy' 
  },
  { 
    id: '3', 
    name: 'Technical Docs', 
    vectors: 18200, 
    dimension: 3072, 
    model: '3-large',
    usage: 32,
    status: 'healthy' 
  },
];

const recentQueries = [
  { id: '1', query: 'How to integrate RAG with my application?', results: 8, avgScore: 0.92, time: '2분 전' },
  { id: '2', query: '벡터 데이터베이스 선택 기준', results: 12, avgScore: 0.89, time: '5분 전' },
  { id: '3', query: 'embedding model comparison', results: 6, avgScore: 0.94, time: '8분 전' },
  { id: '4', query: '청크 크기 최적화 방법', results: 10, avgScore: 0.87, time: '12분 전' },
  { id: '5', query: 'semantic search best practices', results: 15, avgScore: 0.91, time: '15분 전' },
];

const optimizationTips = [
  { 
    title: '벡터 차원 최적화', 
    description: '더 작은 차원의 모델로 전환하여 스토리지 비용을 40% 절감할 수 있습니다.',
    impact: 'high',
    savings: '40% 비용 절감'
  },
  { 
    title: '중복 벡터 제거', 
    description: '1,234개의 중복 벡터가 감지되었습니다. 정리를 권장합니다.',
    impact: 'medium',
    savings: '8% 공간 절약'
  },
  { 
    title: '청크 크기 조정', 
    description: '현재 청크 크기가 너무 작습니다. 512 토큰으로 증가 권장.',
    impact: 'medium',
    savings: '검색 품질 15% 향상'
  },
];

export function VectorManagement() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="mb-6">벡터 관리</div>
        
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="벡터 검색 (시맨틱 검색)..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            필터
          </Button>
          <Button className="gap-2">
            <Upload className="w-4 h-4" />
            벡터 가져오기
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">총 벡터 수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">92,200</div>
            <div className="text-xs text-gray-500 mt-1">3개 벡터 공간</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">스토리지 사용량</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">2.4 GB</div>
            <Progress value={48} className="mt-2" />
            <div className="text-xs text-gray-500 mt-1">5 GB 중 48%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">오늘 검색 수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">4,567</div>
            <div className="text-xs text-green-600 mt-1">+12.3% 증가</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="spaces" className="space-y-6">
        <TabsList>
          <TabsTrigger value="spaces">벡터 공간</TabsTrigger>
          <TabsTrigger value="queries">검색 로그</TabsTrigger>
          <TabsTrigger value="optimization">최적화</TabsTrigger>
        </TabsList>

        <TabsContent value="spaces" className="space-y-4">
          {vectorSpaces.map((space) => (
            <Card key={space.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="mb-2">{space.name}</div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{space.model}</Badge>
                      <Badge variant="outline">{space.dimension}D</Badge>
                      <Badge className="bg-green-100 text-green-700">{space.status}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      재인덱싱
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      내보내기
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6 mb-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">벡터 수</div>
                    <div>{space.vectors.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">차원</div>
                    <div>{space.dimension}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">모델</div>
                    <div className="text-sm">{space.model}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">사용률</div>
                    <div>{space.usage}%</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">스토리지 사용량</span>
                    <span>{space.usage}%</span>
                  </div>
                  <Progress value={space.usage} />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="queries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>최근 검색 쿼리</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentQueries.map((query) => (
                  <div key={query.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="mb-1">{query.query}</div>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>{query.results}개 결과</span>
                        <span>·</span>
                        <span>평균 점수: {query.avgScore}</span>
                        <span>·</span>
                        <span>{query.time}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">상세</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="mb-2">AI 최적화 추천</div>
                  <div className="text-sm text-gray-700 mb-4">
                    시스템 분석 결과, 최대 60%의 비용 절감과 25%의 성능 향상이 가능합니다.
                  </div>
                  <Button>최적화 실행</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {optimizationTips.map((tip, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="mb-1">{tip.title}</div>
                      <Badge 
                        variant={tip.impact === 'high' ? 'default' : 'secondary'}
                        className={tip.impact === 'high' ? 'bg-orange-100 text-orange-700' : ''}
                      >
                        {tip.impact === 'high' ? '높은 영향' : '중간 영향'}
                      </Badge>
                    </div>
                    <div className="text-sm text-green-600">{tip.savings}</div>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">{tip.description}</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">자세히 보기</Button>
                    <Button size="sm">적용하기</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
