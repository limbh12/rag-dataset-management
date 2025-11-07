import { Save, Key, Database, Zap, Shield, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';

export function Settings() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="mb-2">설정</div>
        <div className="text-gray-600">플랫폼 설정 및 구성 관리</div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">일반</TabsTrigger>
          <TabsTrigger value="api">API 키</TabsTrigger>
          <TabsTrigger value="models">모델</TabsTrigger>
          <TabsTrigger value="notifications">알림</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>프로젝트 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">프로젝트 이름</Label>
                <Input id="project-name" defaultValue="RAG Platform" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-desc">설명</Label>
                <Input id="project-desc" defaultValue="RAG 임베딩 모델을 위한 데이터셋 관리 플랫폼" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-model">기본 임베딩 모델</Label>
                <Select defaultValue="ada-002">
                  <SelectTrigger id="default-model">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ada-002">text-embedding-ada-002</SelectItem>
                    <SelectItem value="3-small">text-embedding-3-small</SelectItem>
                    <SelectItem value="3-large">text-embedding-3-large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="gap-2">
                <Save className="w-4 h-4" />
                저장
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>청크 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chunk-size">청크 크기 (토큰)</Label>
                  <Input id="chunk-size" type="number" defaultValue="512" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chunk-overlap">청크 오버랩 (토큰)</Label>
                  <Input id="chunk-overlap" type="number" defaultValue="50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="separator">청크 구분자</Label>
                <Select defaultValue="paragraph">
                  <SelectTrigger id="separator">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paragraph">문단</SelectItem>
                    <SelectItem value="sentence">문장</SelectItem>
                    <SelectItem value="token">토큰</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="gap-2">
                <Save className="w-4 h-4" />
                저장
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>검색 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="similarity-threshold">유사도 임계값</Label>
                  <Input id="similarity-threshold" type="number" step="0.01" defaultValue="0.75" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-results">최대 결과 수</Label>
                  <Input id="max-results" type="number" defaultValue="10" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div>재순위화 활성화</div>
                  <div className="text-sm text-gray-500">검색 결과를 재정렬하여 정확도 향상</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div>캐시 사용</div>
                  <div className="text-sm text-gray-500">자주 사용되는 검색 결과 캐싱</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Button className="gap-2">
                <Save className="w-4 h-4" />
                저장
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                OpenAI API 키
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-key">API 키</Label>
                <Input id="openai-key" type="password" placeholder="sk-..." />
                <div className="text-xs text-gray-500">
                  임베딩 생성에 사용됩니다. OpenAI 대시보드에서 발급받을 수 있습니다.
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-700">API 키 연결됨</span>
                </div>
                <Button variant="outline" size="sm">테스트</Button>
              </div>
              <Button className="gap-2">
                <Save className="w-4 h-4" />
                저장
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                벡터 데이터베이스
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vector-db">데이터베이스 타입</Label>
                <Select defaultValue="pinecone">
                  <SelectTrigger id="vector-db">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pinecone">Pinecone</SelectItem>
                    <SelectItem value="weaviate">Weaviate</SelectItem>
                    <SelectItem value="qdrant">Qdrant</SelectItem>
                    <SelectItem value="chroma">Chroma</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="db-url">연결 URL</Label>
                <Input id="db-url" placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="db-key">API 키</Label>
                <Input id="db-key" type="password" placeholder="API 키 입력" />
              </div>
              <Button className="gap-2">
                <Save className="w-4 h-4" />
                연결 테스트
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                사용 가능한 모델
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { 
                  name: 'text-embedding-ada-002', 
                  dimension: 1536, 
                  cost: '$0.0001/1K tokens',
                  speed: '빠름',
                  enabled: true 
                },
                { 
                  name: 'text-embedding-3-small', 
                  dimension: 1536, 
                  cost: '$0.00002/1K tokens',
                  speed: '매우 빠름',
                  enabled: true 
                },
                { 
                  name: 'text-embedding-3-large', 
                  dimension: 3072, 
                  cost: '$0.00013/1K tokens',
                  speed: '보통',
                  enabled: false 
                },
              ].map((model) => (
                <div key={model.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="mb-1">{model.name}</div>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>차원: {model.dimension}</span>
                      <span>·</span>
                      <span>비용: {model.cost}</span>
                      <span>·</span>
                      <span>속도: {model.speed}</span>
                    </div>
                  </div>
                  <Switch checked={model.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>모델 성능 비교</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div></div>
                  <div className="text-center text-gray-500">ada-002</div>
                  <div className="text-center text-gray-500">3-small</div>
                  <div className="text-center text-gray-500">3-large</div>
                </div>
                <Separator />
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="text-gray-500">품질</div>
                  <div className="text-center">⭐⭐⭐⭐</div>
                  <div className="text-center">⭐⭐⭐⭐</div>
                  <div className="text-center">⭐⭐⭐⭐⭐</div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="text-gray-500">속도</div>
                  <div className="text-center">⭐⭐⭐⭐</div>
                  <div className="text-center">⭐⭐⭐⭐⭐</div>
                  <div className="text-center">⭐⭐⭐</div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="text-gray-500">비용</div>
                  <div className="text-center">⭐⭐⭐</div>
                  <div className="text-center">⭐⭐⭐⭐⭐</div>
                  <div className="text-center">⭐⭐</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                알림 설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div>데이터셋 업로드 완료</div>
                  <div className="text-sm text-gray-500">새 데이터셋이 성공적으로 업로드되면 알림</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div>벡터 생성 완료</div>
                  <div className="text-sm text-gray-500">임베딩 벡터 생성이 완료되면 알림</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div>오류 알림</div>
                  <div className="text-sm text-gray-500">처리 중 오류가 발생하면 즉시 알림</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div>성능 경고</div>
                  <div className="text-sm text-gray-500">검색 성능이 저하되면 알림</div>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div>최적화 제안</div>
                  <div className="text-sm text-gray-500">AI가 최적화를 제안하면 알림</div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                이메일 알림
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">알림 이메일</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div>일일 요약</div>
                  <div className="text-sm text-gray-500">매일 활동 요약을 이메일로 수신</div>
                </div>
                <Switch />
              </div>
              <Button className="gap-2">
                <Save className="w-4 h-4" />
                저장
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
