// Asset map – all hashed filenames referenced from /public/assets
const A = (f: string) => `/assets/${f}`;

export const ASSETS = {
  logo: A("logo.0f10212f.png"),
  heroVideo: A("mooningMonkey.a594b95b.mp4"),
  heroMonkey: A("monkey.3136cf4d.png"),
  monky1: A("monky1.a427c53c.png"),
  border: A("border.53bd6258.png"),
  cardBack: A("cardback.93269dd9.png"),
  cardGreen: A("cardg.24c23a20.png"),
  question: A("question.ea5bdd63.png"),
  black: A("black.618fc344.svg"),
  pdf: A("MM FINAL 1 PAGER.5da9c1f4.pdf"),
  // Evolution stages (4 images)
  evo: [
    A("part-1.d338cda9.png"),
    A("part2.e806f3e9.png"),
    A("part3.08aa5894.png"),
    A("part4.d54ca0bd.png"),
  ],
  // Roadmap visuals
  roadmap: [
    A("roadmap1.c1dc09b0.png"),
    A("roadmap2.fd7d005e.png"),
    A("roadmap3.a98d13d3.png"),
    A("roadmap4.958058ea.png"),
    A("roadmap6.c7f19cc9.png"),
    A("roadmap7.fd7ff359.png"),
    A("roadmap8.48fd50ad.png"),
  ],
  sec1: A("sec1.3473327d.jpg"),
  sec3: A("sec3.143948dd.jpg"),
  sec4front: A("sec4front.de12aca4.png"),
  // 9 sample collection thumbnails (jpg)
  collectionThumbs: [
    A("sec11i1.9ce429a9.jpg"),
    A("sec11i2.2867478f.jpg"),
    A("sec11i3.43b0b5d8.jpg"),
    A("sec11i4.d928d65a.jpg"),
    A("sec11i5.6d8ba285.jpg"),
    A("sec11i6.f447c5ad.jpg"),
    A("sec11i7.53516688.jpg"),
    A("sec11i8.fbd7d431.jpg"),
    A("sec11i9.00d44a3d.jpg"),
  ],
  // 8 promo images
  imgs: [
    A("img1.65b62c26.png"),
    A("img2.97e76f6a.png"),
    A("img3.f6070812.png"),
    A("img4.106378ee.png"),
    A("img5.64171d7a.png"),
    A("img6.b2f419fd.png"),
    A("img7.67b22f70.png"),
    A("img8.b4d63faa.png"),
  ],
  // Monkey character variants 1-24
  monkeys: [
    A("monkey1.abdb24dd.png"), A("monkey1.b9d17749.png"),
    A("monkey2.393c34b8.png"), A("monkey2.f3a9c238.png"),
    A("monkey3.8e8e927c.png"), A("monkey3.bb986a72.png"),
    A("monkey4.4409c0a2.png"), A("monkey4.c46e1c30.png"),
    A("monkey5.20be09f4.png"), A("monkey5.9b8af2a1.png"),
    A("monkey6.4ffabb09.png"), A("monkey6.cc5075ee.png"),
    A("monkey7.6ad29ed2.png"), A("monkey7.bbc9891a.png"),
    A("monkey8.03aa2d73.png"), A("monkey8.e324760b.png"),
    A("monkey9.c3425acf.png"),
    A("monkey10.951242c8.png"), A("monkey11.d80cb77f.png"),
    A("monkey12.d08a8dce.png"), A("monkey13.f497e6df.png"),
    A("monkey14.56445d5f.png"), A("monkey15.29b8a559.png"),
    A("monkey16.13ea5a7c.png"), A("monkey17.0126b025.png"),
    A("monkey18.395c8136.png"), A("monkey19.aab861a6.png"),
    A("monkey20.45f5e60c.png"), A("monkey21.4d180c27.png"),
    A("monkey22.c5d11e07.png"), A("monkey23.2779973b.png"),
    A("monkey24.abf4ee3b.png"),
  ],
};
