import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Trash2,
  Edit,
  MoreVertical,
  Upload,
  Database,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface DatasetListProps {
  onSelectDataset: (id: string) => void;
}

const datasets = [
  {
    id: "1",
    name: "Product Documentation",
    description: "제품 문서 및 가이드",
    vectors: 12500,
    documents: 245,
    size: "156 MB",
    model: "text-embedding-ada-002",
    updated: "2시간 전",
    status: "active",
    category: "documentation",
  },
  {
    id: "2",
    name: "Customer Support KB",
    description: "고객 지원 지식 베이스",
    vectors: 8200,
    documents: 180,
    size: "98 MB",
    model: "text-embedding-ada-002",
    updated: "5시간 전",
    status: "active",
    category: "support",
  },
  {
    id: "3",
    name: "Technical Specs",
    description: "기술 사양 및 API 문서",
    vectors: 15600,
    documents: 312,
    size: "203 MB",
    model: "text-embedding-3-large",
    updated: "1일 전",
    status: "processing",
    category: "technical",
  },
  {
    id: "4",
    name: "Marketing Content",
    description: "마케팅 자료 및 블로그",
    vectors: 6800,
    documents: 142,
    size: "87 MB",
    model: "text-embedding-ada-002",
    updated: "2일 전",
    status: "active",
    category: "marketing",
  },
  {
    id: "5",
    name: "Legal Documents",
    description: "법률 문서 및 계약서",
    vectors: 9400,
    documents: 98,
    size: "124 MB",
    model: "text-embedding-3-large",
    updated: "3일 전",
    status: "active",
    category: "legal",
  },
  {
    id: "6",
    name: "Research Papers",
    description: "연구 논문 및 학술 자료",
    vectors: 18200,
    documents: 425,
    size: "312 MB",
    model: "text-embedding-3-large",
    updated: "5일 전",
    status: "active",
    category: "research",
  },
];

export function DatasetList({
  onSelectDataset,
}: DatasetListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="mb-6">데이터셋 관리</div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="데이터셋 검색..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={filterStatus}
            onValueChange={setFilterStatus}
          >
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="상태 필터" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 상태</SelectItem>
              <SelectItem value="active">활성</SelectItem>
              <SelectItem value="processing">처리중</SelectItem>
              <SelectItem value="error">오류</SelectItem>
            </SelectContent>
          </Select>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Upload className="w-4 h-4" />새 데이터셋
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>새 데이터셋 생성</DialogTitle>
                <DialogDescription>
                  새 데이터셋을 생성하고 관리하세요.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="dataset-name">
                    데이터셋 이름
                  </Label>
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
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="embedding-model">
                    임베딩 모델
                  </Label>
                  <Select defaultValue="ada-002">
                    <SelectTrigger id="embedding-model">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ada-002">
                        text-embedding-ada-002
                      </SelectItem>
                      <SelectItem value="3-small">
                        text-embedding-3-small
                      </SelectItem>
                      <SelectItem value="3-large">
                        text-embedding-3-large
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>파일 업로드</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">
                      클릭하여 파일을 선택하거나 드래그하여
                      업로드
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      PDF, TXT, DOCX, MD (최대 100MB)
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">생성하기</Button>
                  <Button variant="outline" className="flex-1">
                    취소
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-2">
          <Badge variant="secondary" className="cursor-pointer">
            전체 (6)
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            문서 (2)
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            지원 (1)
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            기술 (1)
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            마케팅 (1)
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            기타 (1)
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {datasets.map((dataset) => (
          <Card
            key={dataset.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onSelectDataset(dataset.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      편집
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="w-4 h-4 mr-2" />
                      다운로드
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      삭제
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mb-2">{dataset.name}</div>
              <div className="text-sm text-gray-500 mb-4">
                {dataset.description}
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">벡터:</span>
                  <span>
                    {dataset.vectors.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">문서:</span>
                  <span>{dataset.documents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">크기:</span>
                  <span>{dataset.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">모델:</span>
                  <span className="text-xs">
                    {dataset.model}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    dataset.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {dataset.status === "active"
                    ? "활성"
                    : "처리중"}
                </span>
                <span className="text-xs text-gray-500">
                  {dataset.updated}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}