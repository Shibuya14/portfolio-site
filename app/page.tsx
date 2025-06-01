"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Twitter, Mail, ExternalLink, Menu, X } from "lucide-react"
import Image from "next/image"
import { AnimatedSection } from "@/components/animated-section"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [isHeroLoaded, setIsHeroLoaded] = useState(false)

  useEffect(() => {
    // Hero要素のロード完了を遅延させて表示
    const timer = setTimeout(() => {
      setIsHeroLoaded(true)
    }, 100)

    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "skills", "hobby", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "hobby", label: "Hobby" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#E0E1DD" }}>
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 backdrop-blur-sm border-b z-50 transition-all duration-300"
        style={{ backgroundColor: "rgba(224, 225, 221, 0.9)", borderColor: "#415A77" }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-xl font-bold transition-all duration-300"
              style={{ color: "#1B263B" }}
              onMouseEnter={(e) => (e.target.style.color = "#778DA9")}
              onMouseLeave={(e) => (e.target.style.color = "#1B263B")}
            >
              渋谷佳吾
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium transition-all duration-300 relative"
                  style={{
                    color: activeSection === item.id ? "#778DA9" : "#1B263B",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#778DA9"
                    e.target.style.transform = "translateY(-2px)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = activeSection === item.id ? "#778DA9" : "#1B263B"
                    e.target.style.transform = "translateY(0)"
                  }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span
                      className="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300"
                      style={{ backgroundColor: "#778DA9", transform: "translateY(8px)" }}
                    ></span>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ color: "#1B263B" }}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t" style={{ borderColor: "#415A77" }}>
              <div className="flex flex-col space-y-2 pt-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left py-2 text-sm font-medium transition-all duration-300"
                    style={{
                      color: activeSection === item.id ? "#778DA9" : "#1B263B",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#778DA9")}
                    onMouseLeave={(e) => (e.target.style.color = activeSection === item.id ? "#778DA9" : "#1B263B")}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#E0E1DD" }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div
              className={`mb-8 transition-all duration-1000 ease-out ${isHeroLoaded ? "opacity-100" : "opacity-0 transform translate-y-10"}`}
            >
              <Image
                src="/self-portrait.png"
               alt="渋谷佳吾"
                width={200}
                height={200}
                className="mx-auto rounded-full border-4 shadow-lg transition-transform duration-500 hover:scale-105"
                style={{ borderColor: "#778DA9" }}
              />
            </div>
            <h1
              className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ease-out delay-300 ${isHeroLoaded ? "opacity-100" : "opacity-0 transform translate-y-10"}`}
              style={{ color: "#1B263B" }}
            >
              渋谷佳吾
            </h1>
            <p
              className={`text-xl md:text-2xl mb-4 transition-all duration-1000 ease-out delay-500 ${isHeroLoaded ? "opacity-100" : "opacity-0 transform translate-y-10"}`}
              style={{ color: "#1B263B" }}
            >
              プロダクトを前に進める、クラフト系エンジニア
            </p>
            <p
              className={`text-lg mb-8 transition-all duration-1000 ease-out delay-700 ${isHeroLoaded ? "opacity-100" : "opacity-0 transform translate-y-10"}`}
              style={{ color: "#415A77" }}
            >
              PM志望・UX志向・研究もしている
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20" style={{ backgroundColor: "#E0E1DD" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: "#1B263B" }}>
                <span className="border-b-4 pb-2" style={{ borderColor: "#778DA9" }}>
                  About
                </span>
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <AnimatedSection delay={200} direction="left">
                <div>
                  <h3 className="text-2xl font-semibold mb-4" style={{ color: "#1B263B" }}>
                    所属・研究
                  </h3>
                  <p className="mb-4" style={{ color: "#415A77" }}>
                    大学でUXやリビングラボに関する研究を行っています。ユーザー中心設計の観点から、
                    技術とユーザーニーズを橋渡しするプロダクト開発に興味を持っています。
                  </p>
                  <h3 className="text-2xl font-semibold mb-4" style={{ color: "#1B263B" }}>
                    研究以外の活動
                  </h3>
                  <p className="mb-4" style={{ color: "#415A77" }}>
                    ARLISS（缶サット競技）への参加や企業との共同研究を通じて、
                    実践的な開発経験を積んでいます。チームでの開発において、
                    技術的な実装だけでなく、プロジェクト管理や要件定義にも携わっています。
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={400} direction="right">
                <div>
                  <h3 className="text-2xl font-semibold mb-4" style={{ color: "#1B263B" }}>
                    将来像
                  </h3>
                  <p className="mb-4" style={{ color: "#415A77" }}>
                    技術力を持ちながらも、ビジネス視点でプロダクトを俯瞰できる
                    テックリードやPMを目指しています。ユーザーの課題を技術で解決し、
                    チームを牽引できるエンジニアになりたいと考えています。
                  </p>
                  <div
                    className="p-6 rounded-lg transition-all duration-300 hover:shadow-lg"
                    style={{ backgroundColor: "rgba(119, 141, 169, 0.1)" }}
                  >
                    <h4 className="font-semibold mb-2" style={{ color: "#1B263B" }}>
                      目指す姿
                    </h4>
                    <ul className="text-sm space-y-1" style={{ color: "#415A77" }}>
                      <li>• 技術力もあるPM</li>
                      <li>• ユーザー視点を持つエンジニア</li>
                      <li>• チームを前に進めるリーダー</li>
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20" style={{ backgroundColor: "rgba(119, 141, 169, 0.05)" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: "#1B263B" }}>
                <span className="border-b-4 pb-2" style={{ borderColor: "#778DA9" }}>
                  Projects
                </span>
              </h2>
            </AnimatedSection>

            <div className="space-y-8">
              {/* Project 1 */}
              <AnimatedSection delay={200}>
                <Card
                  className="overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:scale-[1.01]"
                  style={{ backgroundColor: "#E0E1DD" }}
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-auto overflow-hidden">
                      <Image
                        src="/giftech2025.png"
                        alt="ささAI"
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-xl" style={{ color: "#1B263B" }}>
                          GIFTech2025春「ささAI」
                        </CardTitle>
                        <CardDescription style={{ color: "#415A77" }}>お笑いネタ作り支援AI</CardDescription>
                      </CardHeader>
                      <p className="mb-4" style={{ color: "#415A77" }}>
                        React + GPTを活用したお笑いネタ作成支援アプリケーション。
                        ユーザーの入力に基づいてAIがネタのアイデアを提案し、 創作活動をサポートします。
                      </p>
                      <div className="mb-4">
                        <p className="font-semibold mb-2" style={{ color: "#1B263B" }}>
                          役割・成果
                        </p>
                        <p className="text-sm" style={{ color: "#415A77" }}>
                          フロントエンド開発、プレゼン登壇
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="outline"
                          className="border-0 text-sm transition-all duration-300 hover:transform hover:scale-105"
                          style={{ backgroundColor: "#778DA9", color: "#E0E1DD" }}
                        >
                          React
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-0 text-sm transition-all duration-300 hover:transform hover:scale-105"
                          style={{ backgroundColor: "#778DA9", color: "#E0E1DD" }}
                        >
                          GPT API
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-0 text-sm transition-all duration-300 hover:transform hover:scale-105"
                          style={{ backgroundColor: "#778DA9", color: "#E0E1DD" }}
                        >
                          TypeScript
                        </Badge>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </AnimatedSection>

              {/* Project 2 */}
              <AnimatedSection delay={400}>
                <Card
                  className="overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:scale-[1.01]"
                  style={{ backgroundColor: "#E0E1DD" }}
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-auto md:order-2 overflow-hidden">
                      <Image
                        src="/enecloud.png"
                        alt="エネクラウドCRM"
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6 md:order-1">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-xl" style={{ color: "#1B263B" }}>
                          エネクラウドCRM開発
                        </CardTitle>
                        <CardDescription style={{ color: "#415A77" }}>顧客管理システムの要件定義・開発</CardDescription>
                      </CardHeader>
                      <p className="mb-4" style={{ color: "#415A77" }}>
                        エネルギー業界向けCRMシステムの開発プロジェクト。
                        PM的な立場で要件定義からタスク管理、チーム調整まで幅広く担当。
                      </p>
                      <div className="mb-4">
                        <p className="font-semibold mb-2" style={{ color: "#1B263B" }}>
                          役割・成果
                        </p>
                        <p className="text-sm" style={{ color: "#415A77" }}>
                          要件定義、プロジェクト管理、チーム調整
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="outline"
                          className="border-0 text-sm transition-all duration-300 hover:transform hover:scale-105"
                          style={{ backgroundColor: "#778DA9", color: "#E0E1DD" }}
                        >
                          要件定義
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-0 text-sm transition-all duration-300 hover:transform hover:scale-105"
                          style={{ backgroundColor: "#778DA9", color: "#E0E1DD" }}
                        >
                          プロジェクト管理
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-0 text-sm transition-all duration-300 hover:transform hover:scale-105"
                          style={{ backgroundColor: "#778DA9", color: "#E0E1DD" }}
                        >
                          チームマネジメント
                        </Badge>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </AnimatedSection>

              {/* Project 3 */}
              <AnimatedSection delay={600}>
                <Card
                  className="overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:scale-[1.01]"
                  style={{ backgroundColor: "#E0E1DD" }}
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-auto overflow-hidden">
                      <Image
                        src="/CTC.png"
                        alt="CTC共同研究"
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-xl" style={{ color: "#1B263B" }}>
                          CTC共同研究
                        </CardTitle>
                        <CardDescription style={{ color: "#415A77" }}>脱炭素とNFTの研究開発</CardDescription>
                      </CardHeader>
                      <p className="mb-4" style={{ color: "#415A77" }}>
                        脱炭素社会実現に向けたNFT活用の研究プロジェクト。
                        Solidityでのスマートコントラクト開発とPythonでのデータ分析を担当。
                      </p>
                      <div className="mb-4">
                        <p className="font-semibold mb-2" style={{ color: "#1B263B" }}>
                          役割・成果
                        </p>
                        <p className="text-sm" style={{ color: "#415A77" }}>
                          技術開発、先輩後輩マネジメント
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="outline"
                          className="border-0 text-sm transition-all duration-300 hover:transform hover:scale-105"
                          style={{ backgroundColor: "#778DA9", color: "#E0E1DD" }}
                        >
                          Solidity
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-0 text-sm transition-all duration-300 hover:transform hover:scale-105"
                          style={{ backgroundColor: "#778DA9", color: "#E0E1DD" }}
                        >
                          Python
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-0 text-sm transition-all duration-300 hover:transform hover:scale-105"
                          style={{ backgroundColor: "#778DA9", color: "#E0E1DD" }}
                        >
                          NFT
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-0 text-sm transition-all duration-300 hover:transform hover:scale-105"
                          style={{ backgroundColor: "#778DA9", color: "#E0E1DD" }}
                        >
                          ブロックチェーン
                        </Badge>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </AnimatedSection>

              {/* Project 4 */}
              <AnimatedSection delay={800}>
                <Card
                  className="overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:scale-[1.01]"
                  style={{ backgroundColor: "#E0E1DD" }}
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-auto md:order-2 overflow-hidden">
                      <Image
                        src="/arliss.jpg"
                        alt="ARLISS"
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6 md:order-1">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-xl" style={{ color: "#1B263B" }}>
                          ARLISS
                        </CardTitle>
                        <CardDescription style={{ color: "#415A77" }}>缶サット競技・探査機開発</CardDescription>
                      </CardHeader>
                      <p className="mb-4" style={{ color: "#415A77" }}>
                        アメリカ・ネバダ州で開催される缶サット競技に参加。
                        探査機の設計・開発から現地でのトラブル対応まで一貫して担当。
                      </p>
                      <div className="mb-4">
                        <p className="font-semibold mb-2" style={{ color: "#1B263B" }}>
                          役割・成果
                        </p>
                        <p className="text-sm" style={{ color: "#415A77" }}>
                          探査機開発、現地トラブル対応、UNISEC賞受賞
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="outline"
                          className="border-0 text-sm transition-all duration-300 hover:transform hover:scale-105"
                          style={{ backgroundColor: "#778DA9", color: "#E0E1DD" }}
                        >
                          C言語
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-0 text-sm transition-all duration-300 hover:transform hover:scale-105"
                          style={{ backgroundColor: "#778DA9", color: "#E0E1DD" }}
                        >
                          組み込み開発
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-0 text-sm transition-all duration-300 hover:transform hover:scale-105"
                          style={{ backgroundColor: "#778DA9", color: "#E0E1DD" }}
                        >
                          ハードウェア
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-0 text-sm transition-all duration-300 hover:transform hover:scale-105"
                          style={{ backgroundColor: "#778DA9", color: "#E0E1DD" }}
                        >
                          チーム開発
                        </Badge>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20" style={{ backgroundColor: "#E0E1DD" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: "#1B263B" }}>
                <span className="border-b-4 pb-2" style={{ borderColor: "#778DA9" }}>
                  Skills
                </span>
              </h2>
            </AnimatedSection>

            <div className="space-y-8">
              <AnimatedSection delay={200} direction="left">
                <div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: "#1B263B" }}>
                    プログラミング言語
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="text-sm border transition-all duration-300 hover:transform hover:scale-110 hover:shadow-sm"
                      style={{ borderColor: "#778DA9", color: "#1B263B" }}
                    >
                      Python
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-sm border transition-all duration-300 hover:transform hover:scale-110 hover:shadow-sm"
                      style={{ borderColor: "#778DA9", color: "#1B263B" }}
                    >
                      TypeScript
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-sm border transition-all duration-300 hover:transform hover:scale-110 hover:shadow-sm"
                      style={{ borderColor: "#778DA9", color: "#1B263B" }}
                    >
                      Solidity
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-sm border transition-all duration-300 hover:transform hover:scale-110 hover:shadow-sm"
                      style={{ borderColor: "#778DA9", color: "#1B263B" }}
                    >
                      C
                    </Badge>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={400} direction="right">
                <div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: "#1B263B" }}>
                    フレームワーク・ライブラリ
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="text-sm border transition-all duration-300 hover:transform hover:scale-110 hover:shadow-sm"
                      style={{ borderColor: "#778DA9", color: "#1B263B" }}
                    >
                      React
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-sm border transition-all duration-300 hover:transform hover:scale-110 hover:shadow-sm"
                      style={{ borderColor: "#778DA9", color: "#1B263B" }}
                    >
                      Next.js
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-sm border transition-all duration-300 hover:transform hover:scale-110 hover:shadow-sm"
                      style={{ borderColor: "#778DA9", color: "#1B263B" }}
                    >
                      Tailwind CSS
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-sm border transition-all duration-300 hover:transform hover:scale-110 hover:shadow-sm"
                      style={{ borderColor: "#778DA9", color: "#1B263B" }}
                    >
                      scikit-learn
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-sm border transition-all duration-300 hover:transform hover:scale-110 hover:shadow-sm"
                      style={{ borderColor: "#778DA9", color: "#1B263B" }}
                    >
                      Optuna
                    </Badge>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={600} direction="left">
                <div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: "#1B263B" }}>
                    ツール・プラットフォーム
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="text-sm border transition-all duration-300 hover:transform hover:scale-110 hover:shadow-sm"
                      style={{ borderColor: "#778DA9", color: "#1B263B" }}
                    >
                      Git
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-sm border transition-all duration-300 hover:transform hover:scale-110 hover:shadow-sm"
                      style={{ borderColor: "#778DA9", color: "#1B263B" }}
                    >
                      AWS
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-sm border transition-all duration-300 hover:transform hover:scale-110 hover:shadow-sm"
                      style={{ borderColor: "#778DA9", color: "#1B263B" }}
                    >
                      Figma
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-sm border transition-all duration-300 hover:transform hover:scale-110 hover:shadow-sm"
                      style={{ borderColor: "#778DA9", color: "#1B263B" }}
                    >
                      Anki
                    </Badge>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={800} direction="right">
                <div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: "#1B263B" }}>
                    ソフトスキル
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="text-sm border transition-all duration-300 hover:transform hover:scale-110 hover:shadow-sm"
                      style={{ borderColor: "#778DA9", color: "#1B263B" }}
                    >
                      ファシリテーション
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-sm border transition-all duration-300 hover:transform hover:scale-110 hover:shadow-sm"
                      style={{ borderColor: "#778DA9", color: "#1B263B" }}
                    >
                      プレゼンテーション
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-sm border transition-all duration-300 hover:transform hover:scale-110 hover:shadow-sm"
                      style={{ borderColor: "#778DA9", color: "#1B263B" }}
                    >
                      プロジェクトマネジメント
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-sm border transition-all duration-300 hover:transform hover:scale-110 hover:shadow-sm"
                      style={{ borderColor: "#778DA9", color: "#1B263B" }}
                    >
                      チームマネジメント
                    </Badge>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Hobby Section */}
      <section id="hobby" className="py-20" style={{ backgroundColor: "rgba(119, 141, 169, 0.05)" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: "#1B263B" }}>
                <span className="border-b-4 pb-2" style={{ borderColor: "#778DA9" }}>
                  Hobby
                </span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <Card
                className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl"
                style={{ backgroundColor: "#E0E1DD" }}
              >
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-semibold mb-4" style={{ color: "#1B263B" }}>
                        靴作り
                      </h3>
                      <p className="mb-4" style={{ color: "#415A77" }}>
                        大学時代から靴作りを趣味として始めました。革の選定から型紙作成、
                        縫製まで全て手作業で行っています。
                      </p>
                      <p className="mb-4" style={{ color: "#415A77" }}>
                        一足の靴を完成させるまでには約3ヶ月かかりますが、 細部へのこだわりと完成時の達成感は格別です。
                      </p>
                      <p className="mb-4" style={{ color: "#415A77" }}>
                        この経験を通じて、ものづくりの奥深さと、
                        ユーザー（履く人）の立場に立った設計の重要性を学びました。
                        エンジニアリングにも通じる、品質への妥協しない姿勢を大切にしています。
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div
                        className="relative h-96 rounded-lg overflow-hidden border-2 transition-all duration-500 hover:shadow-lg"
                        style={{ borderColor: "#778DA9" }}
                      >
                        <Image
                          src="/shoes.jpg"
                          alt="靴作り - 完成品"
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20" style={{ backgroundColor: "#E0E1DD" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: "#1B263B" }}>
                <span className="border-b-4 pb-2" style={{ borderColor: "#778DA9" }}>
                  Contact
                </span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <p className="text-lg mb-8" style={{ color: "#415A77" }}>
                お気軽にお声がけください
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="https://github.com/Shibuya14"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 transition-all duration-300 p-3 rounded-lg"
                  style={{ color: "#415A77" }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#778DA9"
                    e.target.style.transform = "translateY(-3px)"
                    e.target.style.backgroundColor = "rgba(119, 141, 169, 0.1)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#415A77"
                    e.target.style.transform = "translateY(0)"
                    e.target.style.backgroundColor = "transparent"
                  }}
                >
                  <Github size={24} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://x.com/Shibuya_14"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 transition-all duration-300 p-3 rounded-lg"
                  style={{ color: "#415A77" }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#778DA9"
                    e.target.style.transform = "translateY(-3px)"
                    e.target.style.backgroundColor = "rgba(119, 141, 169, 0.1)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#415A77"
                    e.target.style.transform = "translateY(0)"
                    e.target.style.backgroundColor = "transparent"
                  }}
                >
                  <Twitter size={24} />
                  <span>X</span>
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 transition-all duration-500" style={{ backgroundColor: "#0D1B2A", color: "#E0E1DD" }}>
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 渋谷佳吾. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
