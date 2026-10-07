/*
 * Patent data. To add a patent:
 *   1. Put its drawing sheets in assets/img/<PN>/sheet-N.png plus a cover.png
 *   2. Put the WO pamphlet in assets/pdf/<PN>.pdf
 *   3. Add an entry below (sheets = [width, height] of each sheet image)
 */
window.PATENT_DATA = {
  person: {
    name: "Damian Tamburi",
    linkedin: "https://www.linkedin.com/in/damian-tamburi/"
  },

  patents: [
    {
      pn: "WO2023217390A1",
      part: "winding",
      short: "Internally cooled hollow hairpins",
      title: "Conductor for an electric machine",
      lede: "Hollow hairpin windings that carry coolant, so the winding is cooled from the inside, right where the heat is generated.",
      keys: [
        "The conductor is both the electrical path and the coolant channel.",
        "Hairpins join by sliding axially into a hollow connecting tube: an electrical and fluid joint in one step, without welding.",
        "Direct cooling at the heat source: higher torque density at the same current density and longer insulation life."
      ],
      abstract: "The invention relates to a conductor (2) for an electric machine, comprising: a first winding element (3) made of an electrically conductive material and having a channel (7) through which a coolant can flow, wherein the first winding element (3) is integrally formed with a first straight portion (8), a reverse portion (10) and a second straight portion (9) parallel to the first straight portion (8), wherein the first straight portion (8) has a first end section (12) and the second straight portion (9) has a second end section (13); a hollow connecting member (6) made of electrically conductive material; wherein the hollow connecting member (6) and the first end section (12) of the winding element (3) are axially insertable into each other to form an axially overlapping electrical and fluidic connection. The invention further relates to an electric machine (25) with such a conductor (2).",
      application: "PCT/EP2022/063071",
      priority: "2022-05-13",
      published: "2023-11-16",
      applicant: "GKN Automotive Ltd",
      inventors: ["Alberto Peña Rodriguez", "Jon García Urbieta", "Iñigo García Sierra", "Iago Martinez Ocaña", "Damian Tamburi"],
      cpc: ["H02K3/22", "H02K3/24", "H02K3/12"],
      family: [
        { pn: "CN119213668A", cc: "CN", date: "2024-12-27" },
        { pn: "US20250279686A1", cc: "US", date: "2025-09-04" }
      ],
      espacenet: "https://worldwide.espacenet.com/patent/search/family/082019410/publication/WO2023217390A1?q=pn%3DWO2023217390A1",
      cover: { w: 898, h: 945, alt: "Fig. 8B: side view of the stator with the hairpin conductors and their connecting tubes" },
      sheets: [[954, 1459], [945, 1339], [955, 1373], [961, 1078], [970, 1405], [998, 1348], [974, 1372]]
    },

    {
      pn: "WO2024046562A1",
      part: "stator",
      short: "Stator with integrated cooling channels",
      title: "Electric machine stator with inner cooling channels",
      lede: "Axial channels through the lamination stack that open into the slot, cooling the stator iron and the winding copper together.",
      keys: [
        "Integrated channel: runs partly through the tooth and opens into the slot, so the coolant reaches iron and copper at once.",
        "Overcomes tooth-only channels (little width available) and slot-only channels (little contact with the iron).",
        "Built by stacking two lamination types: one with notches, one with overlapping openings."
      ],
      abstract: "An electric machine stator has an axis and comprises a stator core having a back iron portion, a plurality of teeth and a plurality of slots, the teeth extending radially inwards from the back iron portion with regard to the axis, alternating with the slots. A plurality of inner cooling channels extend through the stator core in parallel to the axis.",
      application: "PCT/EP2022/074252",
      priority: "2022-08-31",
      published: "2024-03-07",
      applicant: "GKN Automotive Ltd",
      inventors: ["Alberto Peña Rodriguez", "Jon García Urbieta", "Damian Tamburi", "Iñigo García Sierra", "Iago Martinez Ocaña"],
      cpc: ["H02K1/20", "H02K3/24", "H02K9/19"],
      family: [
        { pn: "CN119343850A", cc: "CN", date: "2025-01-21" },
        { pn: "DE112022007711T5", cc: "DE", date: "2025-06-12" }
      ],
      espacenet: "https://worldwide.espacenet.com/patent/search/family/083361076/publication/WO2024046562A1?q=pn%3DWO2024046562A1",
      cover: { w: 588, h: 603, alt: "Fig. 1: perspective view of the stator core with its axial cooling channels" },
      sheets: [[863, 1354], [984, 1555], [908, 1358], [1019, 1512]]
    },

    {
      pn: "WO2024067979A1",
      part: "housing",
      short: "Hybrid aluminium–plastic housing",
      title: "Housing assembly for an electric machine for driving a motor vehicle, and electric machine with such a housing assembly",
      lede: "Hybrid housing: an aluminium inner structure for stiffness and bearings, and a plastic outer jacket that closes the cooling channel. Less weight, same job.",
      keys: [
        "One-piece aluminium inner housing: structural stiffness and bearing support.",
        "A plastic outer jacket closes the channel structure, forming the circumferential cooling circuit.",
        "Side part with radial webs and axial openings to save weight; closed base chamber for the resolver."
      ],
      abstract: "The invention relates to a housing assembly for an electric machine for driving a motor vehicle, comprising: an inner housing part (3) for receiving a stator (43) of the electric machine, with a base portion (6) and an inner jacket portion (7) integrally formed of a metal material containing aluminum, wherein the inner jacket portion (7) comprises on an outer circumferential face a channel structure (12) for a cooling fluid; a side part (4) made of a metal material containing aluminum and being connected to an end of the inner housing part (3) opposite the base portion (6); an outer housing part (5) with a base portion (9) and an outer jacket portion (10) which are integrally formed of a plastic material; wherein the outer housing part (5) is mounted on the inner housing part (3) such that the outer jacket portion (10) covers the inner jacket portion (7), with the channel structure (12) being closed to form a circumferential cooling fluid channel (11). The invention further relates to an electric machine (42) with such a housing assembly.",
      application: "PCT/EP2022/077202",
      priority: "2022-09-29",
      published: "2024-04-04",
      applicant: "GKN Automotive Ltd",
      inventors: ["Alberto Peña Rodriguez", "Jon García Urbieta", "Iñigo García Sierra", "Covadonga Gómez Barreales", "Damian Tamburi"],
      cpc: ["H02K5/20", "H02K5/04", "H02K5/173"],
      family: [
        { pn: "CN119325682A", cc: "CN", date: "2025-01-17" },
        { pn: "DE112022007827T5", cc: "DE", date: "2025-07-10" }
      ],
      espacenet: "https://worldwide.espacenet.com/patent/search/family/084045041/publication/WO2024067979A1?q=pn%3DWO2024067979A1",
      cover: { w: 854, h: 746, alt: "Fig. 2: cut-away of the aluminium inner housing with its cooling channel structure" },
      sheets: [[982, 1375], [1008, 1396], [959, 1379]]
    },

    {
      pn: "WO2024146697A1",
      part: "rotor",
      short: "Rotor with spiral cooling channels",
      title: "Electric machine",
      lede: "Spiral channels inside the rotor rings, fed from the hollow shaft, carry coolant to the hottest zone of an induction machine.",
      keys: [
        "Coolant enters through the hollow shaft and centrifugal force from the rotation drives it outward through the ring.",
        "Spiral rather than straight radial channels: a longer path inside the ring and more heat drawn from the squirrel cage.",
        "Copper tubes over-moulded into the aluminium ring; at the outlet, the jet also cools the stator end windings."
      ],
      abstract: "Electric machine (1) comprising: a drive shaft (11) rotatable about an axis of rotation (L), said drive shaft (11) having an axial bore (14), a rotor (4) being non-rotatably secured to the drive shaft (11), said rotor (4) having a rotor core (5) and at least one rotor ring (6, 7) axially supported against an end of the rotor core (5), and at least one cooling channel (12) for conveying coolant, at least partially, in the at least one rotor ring (6, 7), wherein said at least one cooling channel (12) extends from an inlet opening (13), which is fluidly connected to the axial bore (14) of the drive shaft (11), to a radial outward outlet opening (15), characterised in that the at least one cooling channel (12) extends at least partially along a path that deviates from a straight radial direction.",
      application: "PCT/EP2023/050211",
      priority: "2023-01-06",
      published: "2024-07-11",
      applicant: "GKN Automotive Ltd",
      inventors: ["Iñigo García Sierra", "Damián Caballero", "Damian Tamburi", "Jon García Urbieta", "Alberto Peña Rodriguez"],
      cpc: ["H02K1/32", "H02K9/19", "H02K7/003"],
      family: [
        { pn: "CN119325681A", cc: "CN", date: "2025-01-17" },
        { pn: "DE112023005514T5", cc: "DE", date: "2025-10-23" }
      ],
      espacenet: "https://worldwide.espacenet.com/patent/search/family/084942746/publication/WO2024146697A1?q=pn%3DWO2024146697A1",
      cover: { w: 575, h: 630, alt: "Fig. 3: rotor ring with spiral cooling channels" },
      sheets: [[917, 1276], [543, 1212], [698, 1299], [714, 1199]]
    }
  ],

  parts: {
    winding: "Conductor",
    stator: "Stator",
    housing: "Housing",
    rotor: "Rotor"
  },

  countries: {
    CN: "China",
    DE: "Germany",
    US: "United States"
  }
};
