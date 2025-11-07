import {
  ArrowLeft,
  Download,
  Edit,
  Trash2,
  Upload,
  FileText,
  Activity,
  Database,
  Search,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "./ui/dialog";
import { Separator } from "./ui/separator";

interface DatasetDetailProps {
  datasetId: string;
  onBack: () => void;
}

const performanceData = [
  { time: "00:00", retrieval: 245, accuracy: 92 },
  { time: "04:00", retrieval: 312, accuracy: 94 },
  { time: "08:00", retrieval: 428, accuracy: 91 },
  { time: "12:00", retrieval: 567, accuracy: 95 },
  { time: "16:00", retrieval: 489, accuracy: 93 },
  { time: "20:00", retrieval: 356, accuracy: 94 },
];

const documents = [
  {
    id: "doc-1",
    name: "Getting Started Guide.pdf",
    size: "2.4 MB",
    chunks: 45,
    vectors: 450,
    quality: 95,
    updated: "2시간 전",
  },
  {
    id: "doc-2",
    name: "API Reference.md",
    size: "1.8 MB",
    chunks: 38,
    vectors: 380,
    quality: 92,
    updated: "3시간 전",
  },
  {
    id: "doc-3",
    name: "User Manual.docx",
    size: "3.2 MB",
    chunks: 62,
    vectors: 620,
    quality: 88,
    updated: "5시간 전",
  },
  {
    id: "doc-4",
    name: "FAQ.txt",
    size: "892 KB",
    chunks: 28,
    vectors: 280,
    quality: 97,
    updated: "1일 전",
  },
  {
    id: "doc-5",
    name: "Installation Guide.pdf",
    size: "1.5 MB",
    chunks: 32,
    vectors: 320,
    quality: 94,
    updated: "1일 전",
  },
];

const vectors = [
  {
    id: "vec-1",
    text: "RAG는 검색 증강 생성(Retrieval Augmented Generation)의 약자입니다...",
    dimension: 1536,
    similarity: 0.95,
  },
  {
    id: "vec-2",
    text: "벡터 임베딩은 텍스트를 수치형 벡터로 변환하는 프로세스입니다...",
    dimension: 1536,
    similarity: 0.92,
  },
  {
    id: "vec-3",
    text: "시맨틱 검색은 의미론적 유사성을 기반으로 정보를 검색합니다...",
    dimension: 1536,
    similarity: 0.89,
  },
  {
    id: "vec-4",
    text: "청크 크기는 텍스트를 분할할 때 각 조각의 크기를 의미합니다...",
    dimension: 1536,
    similarity: 0.87,
  },
  {
    id: "vec-5",
    text: "코사인 유사도는 벡터 간의 각도를 측정하여 유사성을 계산합니다...",
    dimension: 1536,
    similarity: 0.85,
  },
];

export function DatasetDetail({
  datasetId,
  onBack,
}: DatasetDetailProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    useState(false);

  return (
    <div className="p-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          뒤로 가기
        </Button>

        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Database className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="mb-2">Product Documentation</div>
              <div className="text-gray-600 mb-3">
                제품 문서 및 사용자 가이드 모음
              </div>
              <div className="flex gap-2">
                <Badge>활성</Badge>
                <Badge variant="outline">
                  text-embedding-ada-002
                </Badge>
                <Badge variant="outline">245 documents</Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Edit className="w-4 h-4" />
              편집
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              내보내기
            </Button>
            <Dialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                  삭제
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>데이터셋 삭제</DialogTitle>
                  <DialogDescription>
                    이 데이터셋을 삭제하시겠습니까? 이 작업은
                    되돌릴 수 없습니다.
                  </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    취소
                  </Button>
                  <Button
                    variant="red"
                    className="ml-2"
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    삭제
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">
              총 벡터 수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">12,500</div>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">문서 수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">245</div>
            <div className="text-xs text-gray-500 mt-1">
              총 156 MB
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">평균 품질</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">93.2%</div>
            <div className="text-xs text-green-600 mt-1">
              우수
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">검색 횟수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">2,847</div>
            <div className="text-xs text-gray-500 mt-1">
              오늘
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList>
          <TabsTrigger value="documents">문서</TabsTrigger>
          <TabsTrigger value="vectors">벡터</TabsTrigger>
          <TabsTrigger value="performance">성능</TabsTrigger>
          <TabsTrigger value="settings">설정</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="문서 검색..."
                className="pl-10"
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Upload className="w-4 h-4" />
                  문서 추가
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>문서 업로드</DialogTitle>
                  <DialogDescription>
                    새로운 문서를 업로드하여 벡터 임베딩을
                    생성합니다.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* 파일 업로드 영역 */}
                  <div>
                    <div className="text-sm mb-3">
                      파일 선택
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <div className="text-sm mb-2">
                        클릭하여 파일을 선택하거나 드래그하여
                        업로드
                      </div>
                      <div className="text-xs text-gray-500">
                        PDF, TXT, DOCX, MD 파일 지원 (최대
                        100MB)
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* 업로드 옵션 */}
                  <div>
                    <div className="text-sm mb-3">
                      업로드 옵션
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                          임베딩 모델
                        </div>
                        <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                          <option>
                            text-embedding-ada-002 (권장)
                          </option>
                          <option>
                            text-embedding-3-small
                          </option>
                          <option>
                            text-embedding-3-large
                          </option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600">
                            청크 크기
                          </div>
                          <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                            <option>512 토큰 (기본)</option>
                            <option>256 토큰</option>
                            <option>1024 토큰</option>
                            <option>사용자 정의</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm text-gray-600">
                            청크 오버랩
                          </div>
                          <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                            <option>50 토큰 (기본)</option>
                            <option>20 토큰</option>
                            <option>100 토큰</option>
                            <option>사용자 정의</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <input
                          type="checkbox"
                          id="auto-process"
                          defaultChecked
                          className="rounded"
                        />
                        <label
                          htmlFor="auto-process"
                          className="text-sm text-blue-900 cursor-pointer"
                        >
                          업로드 후 자동으로 벡터 생성
                        </label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* 예상 정보 */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm mb-3">
                      예상 처리 정보
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          예상 청크 수:
                        </span>
                        <span>약 45-50개</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          예상 벡터 수:
                        </span>
                        <span>약 450-500개</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          예상 처리 시간:
                        </span>
                        <span>2-3분</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          예상 비용:
                        </span>
                        <span className="text-green-600">
                          $0.05
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">
                    취소
                  </Button>
                  <Button className="flex-1 gap-2">
                    <Upload className="w-4 h-4" />
                    업로드 시작
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1">{doc.name}</div>
                          <div className="flex gap-4 text-sm text-gray-500">
                            <span>{doc.size}</span>
                            <span>·</span>
                            <span>{doc.chunks} 청크</span>
                            <span>·</span>
                            <span>{doc.vectors} 벡터</span>
                            <span>·</span>
                            <span>품질: {doc.quality}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                          {doc.updated}
                        </span>
                        <Button variant="ghost" size="sm">
                          보기
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vectors" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="벡터 검색 (시맨틱 검색)..."
              className="flex-1"
            />
            <Button variant="outline">고급 필터</Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200">
                {vectors.map((vector) => (
                  <div
                    key={vector.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="text-sm mb-2">
                          {vector.text}
                        </div>
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span>차원: {vector.dimension}</span>
                          <span>·</span>
                          <span>
                            유사도: {vector.similarity}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          복사
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              상세
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>
                                벡터 DB 상세 정보
                              </DialogTitle>
                              <DialogDescription>
                                벡터 임베딩과 메타데이터에 대한
                                상세 정보입니다.
                              </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6">
                              {/* 벡터 기본 정보 */}
                              <div>
                                <div className="text-sm mb-3">
                                  벡터 ID
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg font-mono text-sm">
                                  {vector.id}
                                </div>
                              </div>

                              <Separator />

                              {/* 텍스트 내용 */}
                              <div>
                                <div className="text-sm mb-3">
                                  원본 텍스트
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg text-sm max-h-32 overflow-y-auto">
                                  {vector.text}
                                </div>
                              </div>

                              <Separator />

                              {/* 벡터 속성 */}
                              <div>
                                <div className="text-sm mb-3">
                                  벡터 속성
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="p-3 bg-blue-50 rounded-lg">
                                    <div className="text-xs text-gray-500 mb-1">
                                      차원
                                    </div>
                                    <div className="text-lg">
                                      {vector.dimension}
                                    </div>
                                  </div>
                                  <div className="p-3 bg-green-50 rounded-lg">
                                    <div className="text-xs text-gray-500 mb-1">
                                      유사도 점수
                                    </div>
                                    <div className="text-lg">
                                      {vector.similarity}
                                    </div>
                                  </div>
                                  <div className="p-3 bg-purple-50 rounded-lg">
                                    <div className="text-xs text-gray-500 mb-1">
                                      모델
                                    </div>
                                    <div className="text-sm">
                                      ada-002
                                    </div>
                                  </div>
                                  <div className="p-3 bg-orange-50 rounded-lg">
                                    <div className="text-xs text-gray-500 mb-1">
                                      인덱스
                                    </div>
                                    <div className="text-sm">
                                      HNSW
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              {/* 메타데이터 */}
                              <div>
                                <div className="text-sm mb-3">
                                  메타데이터
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">
                                      문서 ID:
                                    </span>
                                    <span className="font-mono">
                                      doc-
                                      {Math.floor(
                                        Math.random() * 1000,
                                      )}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">
                                      청크 인덱스:
                                    </span>
                                    <span>
                                      {Math.floor(
                                        Math.random() * 50,
                                      )}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">
                                      생성일:
                                    </span>
                                    <span>
                                      2024-11-
                                      {String(
                                        Math.floor(
                                          Math.random() * 28,
                                        ) + 1,
                                      ).padStart(2, "0")}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">
                                      토큰 수:
                                    </span>
                                    <span>
                                      {Math.floor(
                                        Math.random() * 300,
                                      ) + 100}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              {/* 벡터 값 샘플 */}
                              <div>
                                <div className="text-sm mb-3">
                                  벡터 값 (처음 10개)
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg font-mono text-xs overflow-x-auto">
                                  [
                                  {Array.from(
                                    { length: 10 },
                                    (_, i) =>
                                      (
                                        Math.random() * 2 -
                                        1
                                      ).toFixed(6),
                                  ).join(", ")}
                                  , ... ]
                                </div>
                                <div className="text-xs text-gray-500 mt-2">
                                  총 {vector.dimension}개 차원
                                  중 10개만 표시
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 pt-4">
                              <Button
                                variant="outline"
                                className="flex-1"
                              >
                                벡터 내보내기
                              </Button>
                              <Button
                                variant="outline"
                                className="flex-1"
                              >
                                복사하기
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>검색 성능 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                  />
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="retrieval"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="검색 횟수"
                  />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="정확도 %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  평균 응답 시간
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">142ms</div>
                <div className="text-xs text-green-600 mt-1">
                  -23ms 개선
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  검색 정확도
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">93.4%</div>
                <div className="text-xs text-green-600 mt-1">
                  +2.1% 향상
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  캐시 적중률
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">87.2%</div>
                <div className="text-xs text-gray-500 mt-1">
                  양호
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>임베딩 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm">임베딩 모델</div>
                  <div className="text-sm text-gray-600">
                    text-embedding-ada-002
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">벡터 차원</div>
                  <div className="text-sm text-gray-600">
                    1536
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">청크 크기</div>
                  <div className="text-sm text-gray-600">
                    512 tokens
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">청크 오버랩</div>
                  <div className="text-sm text-gray-600">
                    50 tokens
                  </div>
                </div>
              </div>
              <Button variant="outline" className="mt-4">
                설정 수정
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
                  <div className="text-sm">유사도 임계값</div>
                  <div className="text-sm text-gray-600">
                    0.75
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">최대 결과 수</div>
                  <div className="text-sm text-gray-600">
                    10
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">재순위화</div>
                  <div className="text-sm text-gray-600">
                    활성화
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">캐시 만료</div>
                  <div className="text-sm text-gray-600">
                    1시간
                  </div>
                </div>
              </div>
              <Button variant="outline" className="mt-4">
                설정 수정
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}