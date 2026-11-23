import type { Course } from '../curriculum-types';

export const COMPUTER_SUPPORT_COURSE: Course = {
  id: 'computer-support-specialist',
  slug: 'computer-support-specialist',
  track: 'Data, SQL & IT Operations',
  level: 'Foundational',
  title: 'Computer Support Specialist',
  subtitle:
    'Start from how CPU, RAM, storage, and POST boot a computer—then build step-by-step through binary/IPv4, CIDR subnet math, OSI layers, DNS/DHCP outages, ticket triage, SLA routing, and Zero-Trust MFA recovery.',
  durationHours: 20,
  rating: 4.8,
  reviewCount: 3650,
  instructor: {
    name: 'Marcus Vance',
    role: 'Director of IT Infrastructure',
    organization: 'NorthGrid Systems',
  },
  thumbnailKey: 'data-cloud',
  primaryMode: 'sandbox',
  primaryRuntime: 'js',
  capstoneTitle: 'Enterprise IT Service Desk & Incident Triage Playbook',
  capstoneSummary:
    'Combine hardware POST diagnostics, CIDR subnet calculators, OSI Layer 1–7 isolation, DNS/DHCP troubleshooting, deterministic P1–P3 SLA routing, and zero-trust MFA recovery into a complete IT Playbook.',
  capstoneDeliverables: [
    'Hardware boot/POST failure matrix and binary/IPv4 octet foundation',
    'Interactive CIDR subnetting and P1–P3 SLA routing calculators',
    'OSI bottom-up troubleshooting, DNS/DHCP recovery, and OS service checklists',
    'Zero-Trust MFA verification SOP & Service Desk Capstone Playbook',
  ],
  outcomes: [
    'Isolate hardware power, POST, memory, and thermal symptoms systematically',
    'Calculate IPv4 subnet capacity (/24, /26, /30) accurately in code',
    'Troubleshoot network issues bottom-up across OSI Layer 1 to DNS/HTTP',
    'Triage incidents by blast radius (P1–P3) and verify identity securely',
  ],
  modules: [
    {
      id: 'cs-m1',
      number: '01',
      title: 'Anatomy of a Computer: CPU, RAM, Storage & POST',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'deliverable',
      lessonSummary:
        'Start at physical hardware basics: what the **CPU** (processor), **RAM** (fast temporary memory), **SSD** (permanent drive), and **PSU** (power supply) do—and how **POST** (Power-On Self-Test) signals early hardware faults.',
      keyConcepts: [
        'Role of CPU vs volatile RAM vs persistent SSD storage',
        'How POST checks RAM and GPU before the operating system even loads',
        'Separating power failures from display-cable vs OS boot issues',
      ],
      architectureNote:
        'If a workstation powers on with fans spinning yet shows zero screen and emits 3 short beeps before the OS logo appears, that is a hardware POST fault—reinstalling Windows will never fix a loose RAM stick.',
      deliverableTitle: 'Complete Hardware & POST Diagnostic Triage',
      deliverablePrompt:
        'Classify a workstation exhibiting spinning fans, black monitor, and 3 POST beeps; identify the role of RAM vs SSD; and recommend the very first non-destructive isolation check.',
      acceptanceCriteria: [
        'Differentiates volatile RAM from persistent SSD storage',
        'Identifies POST failure cleanly on pre-boot symptoms',
        'Recommends checking display/seating RAM before wiping OS',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 01 of 12 · Hardware & Boot Foundation',
        diagram: {
          type: 'flow',
          title: 'Inside Computer Boot Sequence',
          caption: 'Power flows from PSU to motherboard; BIOS/UEFI runs POST to test RAM/CPU before loading the OS from SSD.',
          nodes: ['PSU Power On', 'BIOS/UEFI POST', 'Load OS from SSD'],
        },
        sections: [
          {
            heading: 'CPU, RAM, and SSD in Plain English',
            explanation:
              'Think of a **desk workshop**: the **CPU** is the worker doing math, **RAM** is the active desktop where open files sit fast (wiped when power shuts off), and the **SSD** is the filing cabinet keeping files safely overnight.',
          },
          {
            heading: 'What Is POST (Power-On Self-Test)?',
            explanation:
              'In the first 2 seconds after pressing Power, the motherboard checks if CPU, RAM, and video output work. Beep codes or motherboard LEDs tell technicians which part failed before Windows or macOS even starts.',
          },
        ],
        liveExample: {
          title: 'Live Example: First-Check Isolation Order',
          description: 'Always check simple external causes before tearing down hardware.',
          code: '1. Verify monitor power & HDMI/DP cable seating.\n2. Note POST beep/LED code (e.g., RAM fault).\n3. Reseat RAM module cleanly before touching SSD/OS.',
          expectedOutput: 'Resolves black-screen POST issues safely without data loss.',
        },
        commonMistake: {
          title: 'Assuming Every Black Screen Needs an OS Reinstall',
          wrongWay: '"No picture on boot -> Reformat the hard drive!"',
          rightWay: '"Fans spin + POST beeps before OS logo -> Check cable & RAM seating first."',
          whyItHappens:
            'If POST never finishes, the operating system hasn’t even started running yet.',
        },
        tryItMission:
          'Select the likely fault layer, explain RAM vs SSD cleanly, and list your first physical step.',
      },
      knowledgeCheck: {
        question: 'A desktop powers on with fans spinning, no logo appears, and the motherboard emits 3 beeps. Which stage failed?',
        options: [
          'Hardware Power-On Self-Test (POST), commonly RAM or display hardware',
          'Browser cookie expiration',
          'DNS caching timeout',
        ],
        correctIndex: 0,
        explanation: 'Beep codes before any OS logo indicate a motherboard POST hardware failure.',
      },
      hints: [
        'Explain that RAM holds active temporary memory while SSD stores permanent files.',
        'Mention reseating the RAM or checking video cable before wiping the SSD.',
        'Pick the POST hardware isolation option.',
      ],
      referenceSolution: `1. RAM vs SSD: RAM is fast temporary workspace cleared on reboot, while the SSD holds permanent operating system and user files.
2. Fault Isolation: POST hardware check (likely loose RAM module or video fault) before the OS loads.
3. First Step: Check display cable/monitor input, then power off and reseat the RAM modules cleanly without wiping the SSD.`,
      deliverableFields: [
        {
          id: 'ram_vs_ssd',
          label: 'RAM vs SSD Difference',
          placeholder: 'Explain temporary volatile workspace vs persistent storage...',
          type: 'textarea',
          helperText: 'Explain both RAM and SSD clearly (25+ characters).',
          validationRule: { minLength: 25, mustContain: ['ram', 'ssd'], errorMessage: 'Contrast both RAM and SSD.' },
        },
        {
          id: 'post_diagnosis',
          label: 'Probable Stage for Fans + Black Screen + 3 Beeps',
          placeholder: 'Select failure stage',
          type: 'select',
          options: [
            'Hardware POST failure before OS loads (check RAM/display)',
            'Expired browser TLS certificate',
            'Slow Wi-Fi DNS server',
          ],
          helperText: 'Select the accurate pre-boot layer.',
          validationRule: {
            exactOption: 'Hardware POST failure before OS loads (check RAM/display)',
            errorMessage: 'Beep codes before boot point to a POST hardware failure.',
          },
        },
        {
          id: 'first_step',
          label: 'First Safe Technician Action',
          placeholder: 'e.g., Verify monitor cable and reseat RAM modules after powering down',
          type: 'text',
          helperText: 'State a safe non-destructive hardware step.',
          validationRule: { minLength: 15, mustContain: ['ram'], errorMessage: 'Recommend checking display/RAM safely.' },
        },
      ],
    },

    {
      id: 'cs-m2',
      number: '02',
      title: 'Binary, Bits, Bytes & IPv4 Fundamentals',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'sandbox',
      runtime: 'js',
      lessonSummary:
        'Every IP address on Earth—like `192.168.1.50`—is really four 8-bit numbers (`32 bits` total). Write a helper converting an IPv4 string into its 4 numeric octets and validating each lies in `0..255`.',
      keyConcepts: [
        '8 bits = 1 byte (values `0` through `255`)',
        'IPv4 = 4 octets (`32` bits total separated by `.`)',
        'Validating `0 <= octet <= 255` to catch typos like `192.168.300.1`',
      ],
      architectureNote:
        'An 8-bit number can only count from `0` to `255` (`2^8 = 256` states). That single rule explains why `192.168.1.300` is impossible in IPv4!',
      deliverableTitle: 'Write validateIPv4(ip) in index.js',
      deliverablePrompt:
        'Split `ip` on `"."`. Return `true` only if there are exactly 4 parts, every part is a valid non-empty integer string without leading/trailing whitespace, and every integer satisfies `0 <= num && num <= 255`.',
      acceptanceCriteria: [
        'Accepts valid IPv4 like "192.168.1.50" and "10.0.0.1"',
        'Rejects out-of-range octets like "192.168.300.1"',
        'Rejects addresses with fewer or more than 4 parts',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 02 of 12 · IPv4 Octet Validator',
        diagram: {
          type: 'flow',
          title: 'Inside a 32-Bit IPv4 Address',
          caption: 'Four dot-separated octets—each holding 8 bits (0 to 255)—add up to 32 bits total.',
          nodes: ['4 Parts via .split(".")', 'Each Integer 0..255', 'Valid 32-bit IP'],
        },
        sections: [
          {
            heading: 'Why IPv4 Stops at 255',
            explanation:
              'Computers store numbers in base-2 bits (`0` or `1`). Eight bits (`11111111`) add up to `255`. Every IPv4 address puts four 8-bit numbers side by side: `4 * 8 = 32 bits`.',
            codeLanguage: 'javascript',
            codeSnippet: 'const parts = ip.split(".");\n// Check parts.length === 4 and each 0 <= Number(p) <= 255',
          },
        ],
        liveExample: {
          title: 'Live Example: Checking Octet Bounds',
          description: 'See how `.split(".")` catches `300` immediately.',
          code: 'const parts = "192.168.300.1".split(".");\nconsole.log("Parts:", parts.length, "Valid range?", parts.every((p) => Number(p) >= 0 && Number(p) <= 255));',
          expectedOutput: 'Parts: 4 Valid range? false',
        },
        commonMistake: {
          title: 'Only Checking `parts.length === 4`',
          wrongWay: 'return ip.split(".").length === 4;  // Accepts "999.999.999.999"!',
          rightWay: 'Check length === 4 AND /^\\d+$/.test(p) AND n >= 0 && n <= 255.',
          whyItHappens:
            'Every octet must fit inside 8 bits (`0..255`) and contain only digits.',
        },
        tryItMission:
          'Complete `validateIPv4(ip)` in index.js checking 4 numeric octets within `0..255`.',
      },
      knowledgeCheck: {
        question: 'Why is `10.0.256.5` an invalid IPv4 address?',
        options: [
          'Each 8-bit octet can only represent values from 0 through 255',
          'IPv4 addresses cannot start with 10',
          'IPv4 addresses require 6 octets',
        ],
        correctIndex: 0,
        explanation: '8 bits hold 256 possible numbers (`0..255`), so `256` overflows an octet.',
      },
      hints: [
        'Split with `const parts = String(ip).split(".");` and verify `parts.length === 4`.',
        'Check each part with `/^\\d+$/.test(p)` and `const n = Number(p); return n >= 0 && n <= 255;`.',
      ],
      referenceSolution: `function validateIPv4(ip) {
  const parts = String(ip).split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => {
    if (!/^\\d+$/.test(p)) return false;
    const n = Number(p);
    return n >= 0 && n <= 255;
  });
}

console.log("192.168.1.50:", validateIPv4("192.168.1.50"), "300:", validateIPv4("192.168.300.1"));`,
      workspaceFiles: [
        { filename: 'index.js', language: 'javascript', readOnly: false, content: 'Editable JavaScript lab' },
      ],
      starterCode: `function validateIPv4(ip) {
  const parts = String(ip).split(".");
  // TODO: Verify 4 integer parts all between 0 and 255
  return false;
}

console.log("192.168.1.50:", validateIPv4("192.168.1.50"), "300:", validateIPv4("192.168.300.1"));`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Accepts valid private and public IPv4 addresses',
          expression: 'validateIPv4("192.168.1.50") === true && validateIPv4("10.0.0.1") === true',
          expectedDescription: 'Accepts standard 4-octet addresses in 0..255',
        },
        {
          id: 't2',
          label: 'Rejects octets > 255 and wrong segment counts',
          expression:
            'validateIPv4("192.168.300.1") === false && validateIPv4("192.168.1") === false && validateIPv4("10.0.a.1") === false',
          expectedDescription: 'Rejects out-of-range, 3-part, and non-digit inputs',
        },
      ],
    },

    {
      id: 'cs-m3',
      number: '03',
      title: 'Practical CIDR Subnet Math (/24, /26, Usable Hosts)',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 1 · Foundations',
      mode: 'sandbox',
      runtime: 'js',
      lessonSummary:
        'Now build on Lesson 02’s 32-bit IPv4 knowledge! A CIDR prefix like `/24` locks the first `24` bits for the network, leaving `32 - 24 = 8` host bits (`2^8 = 256` addresses, minus 2 reserved = `254` usable hosts).',
      keyConcepts: [
        'Calculating `hostBits = 32 - cidrPrefix`',
        'Subtracting 2 reserved addresses (network ID + broadcast) for usable hosts',
        'Guarding invalid prefixes (`cidrPrefix < 1 || cidrPrefix > 30`)',
      ],
      architectureNote:
        'Sizing a `/26` office Wi-Fi subnet (`62` hosts) accurately stops DHCP IP pool exhaustion before 80 laptops connect at Monday morning standup.',
      deliverableTitle: 'Build inspectSubnet(cidrPrefix) in index.js',
      deliverablePrompt:
        'Return `{ error: "INVALID_CIDR" }` if `cidrPrefix < 1 || cidrPrefix > 30`; otherwise return `{ prefix: cidrPrefix, total: Math.pow(2, 32 - cidrPrefix), usableHosts: total - 2 }`.',
      acceptanceCriteria: [
        'Computes /24 -> 256 total, 254 usableHosts',
        'Computes /26 -> 64 total, 62 usableHosts',
        'Guards invalid CIDR (<1 or >30) cleanly',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 03 of 12 · CIDR Capacity Calculator',
        diagram: {
          type: 'flow',
          title: 'Splitting 32 Bits into Network + Hosts',
          caption: 'Subtract CIDR prefix from 32 to get host bits, compute 2^hostBits, and subtract 2 reserved addresses.',
          nodes: ['hostBits = 32 - cidr', 'total = 2^hostBits', 'usable = total - 2'],
        },
        sections: [
          {
            heading: 'Why We Subtract 2 from Total IPs',
            explanation:
              'Every IPv4 subnet reserves its very first address (Network ID, `.0`) and its very last address (Broadcast, `.255`), leaving `total - 2` usable device IP addresses.',
            codeLanguage: 'javascript',
            codeSnippet: 'const hostBits = 32 - cidrPrefix;\nconst total = Math.pow(2, hostBits);\nconst usableHosts = total - 2;',
          },
        ],
        liveExample: {
          title: 'Live Example: /24 vs /26 Capacity',
          description: 'Compare office subnet sizes quickly in JS.',
          code: 'for (const p of [24, 26, 30]) {\n  const total = Math.pow(2, 32 - p);\n  console.log("/" + p, "-> usable:", total - 2);\n}',
          expectedOutput: '/24 -> usable: 254\n/26 -> usable: 62\n/30 -> usable: 2',
        },
        commonMistake: {
          title: 'Forgetting to Subtract 2 Reserved Addresses',
          wrongWay: 'usableHosts = Math.pow(2, 32 - cidrPrefix);  // Overcounts by 2!',
          rightWay: 'usableHosts = total - 2;',
          whyItHappens:
            'Network ID and Broadcast addresses cannot be assigned to employee laptops.',
        },
        tryItMission:
          'Complete `inspectSubnet(cidrPrefix)` with `[1, 30]` validation and `total - 2` usable math.',
      },
      knowledgeCheck: {
        question: 'How many usable host IP addresses are available on a `/26` IPv4 subnet?',
        options: ['62 usable hosts (64 total minus 2 reserved)', '64 usable hosts', '254 usable hosts'],
        correctIndex: 0,
        explanation: '`32 - 26 = 6` host bits -> `2^6 = 64` total addresses, minus 2 reserved = `62` usable.',
      },
      hints: [
        'Guard `if (cidrPrefix < 1 || cidrPrefix > 30) return { error: "INVALID_CIDR" };` first.',
        'Compute `hostBits = 32 - cidrPrefix`, `total = Math.pow(2, hostBits)`, `usableHosts = total - 2`.',
      ],
      referenceSolution: `function inspectSubnet(cidrPrefix) {
  if (cidrPrefix < 1 || cidrPrefix > 30) {
    return { error: "INVALID_CIDR" };
  }
  const hostBits = 32 - cidrPrefix;
  const total = Math.pow(2, hostBits);
  const usableHosts = total - 2;
  return { prefix: cidrPrefix, total, usableHosts };
}

console.log("/24:", inspectSubnet(24), "/26:", inspectSubnet(26));`,
      workspaceFiles: [
        { filename: 'index.js', language: 'javascript', readOnly: false, content: 'Editable JavaScript lab' },
      ],
      starterCode: `function inspectSubnet(cidrPrefix) {
  // TODO: Guard invalid prefix (<1 or >30) and compute total & usableHosts
  return { prefix: cidrPrefix, total: 0, usableHosts: 0 };
}

console.log("/24:", inspectSubnet(24), "/26:", inspectSubnet(26));`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Computes /24 subnet accurately (256 total, 254 usable)',
          expression: 'inspectSubnet(24).total === 256 && inspectSubnet(24).usableHosts === 254',
          expectedDescription: '/24 yields 254 usable hosts',
        },
        {
          id: 't2',
          label: 'Computes /26 subnet accurately (62 usable)',
          expression: 'inspectSubnet(26).usableHosts === 62',
          expectedDescription: '/26 yields 62 usable hosts',
        },
        {
          id: 't3',
          label: 'Rejects out-of-range CIDR (/31, /0)',
          expression: 'inspectSubnet(31).error === "INVALID_CIDR" && inspectSubnet(0).error === "INVALID_CIDR"',
          expectedDescription: 'Guards invalid CIDR prefixes cleanly',
        },
      ],
    },

    {
      id: 'cs-m4',
      number: '04',
      title: 'The OSI Model Applied to Help-Desk Tickets',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'deliverable',
      lessonSummary:
        'When a user reports *"Nothing works!"*, strong technicians isolate the exact **OSI layer** bottom-up: **Layer 1** (cables/Wi-Fi signal), **Layer 3** (IP address & routing), or **Layer 7** (DNS names & browser/HTTPS apps).',
      keyConcepts: [
        'Layer 1 Physical (unplugged Ethernet, dead switch port, Wi-Fi off)',
        'Layer 3 Network (IP assignment, subnet, default gateway ping)',
        'Layer 7 Application (DNS resolution, HTTPS TLS certificates, app login)',
      ],
      architectureNote:
        'Testing bottom-up—Link LED (L1) -> Gateway Ping (L3) -> DNS Lookup (L7)—isolates root causes in 60 seconds instead of guessing blindly.',
      deliverableTitle: 'Map Real Symptoms to OSI Troubleshooting Layers',
      deliverablePrompt:
        'Diagnose a laptop that can `ping 8.8.8.8` (raw IP works) yet fails to load `apex.com` in Chrome: identify the OSI layer, select the right next CLI check, and explain why.',
      acceptanceCriteria: [
        'Identifies Layer 7 Application / DNS accurately when ping IP succeeds',
        'Selects nslookup / dig DNS check rather than replacing hardware',
        'Documents clear bottom-up reasoning',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 04 of 12 · OSI Diagnostic Map',
        diagram: {
          type: 'osi-layers',
          title: 'Bottom-Up OSI Troubleshooting',
          caption: 'If Layer 1 (link) and Layer 3 (ping 8.8.8.8) succeed, the fault sits above IP—typically Layer 7 DNS.',
          nodes: ['DNS / HTTPS (App)', 'IP & Gateway (Net)', 'Cable / Wi-Fi (Phys)', 'L1 -> L3 -> L7'],
        },
        sections: [
          {
            heading: 'Why Bottom-Up Beats Random Rebooting',
            explanation:
              'If `ping 8.8.8.8` gets replies, your Ethernet cable (Layer 1) and IP routing (Layer 3) are 100% healthy! Only domain-to-IP translation (**DNS at Layer 7**) is failing.',
          },
        ],
        liveExample: {
          title: 'Live Example: 3-Command Isolation Ladder',
          description: 'Run these three conceptual checks bottom-up on any network ticket.',
          code: '1. Link up? (L1 Physical)\n2. ping 192.168.1.1 / 8.8.8.8? (L3 Network Routing)\n3. nslookup portal.company.com? (L7 DNS Name Lookup)',
          expectedOutput: 'Pinpoints exact broken layer in under a minute.',
        },
        commonMistake: {
          title: 'Swapping Ethernet Cables When `ping 8.8.8.8` Already Works',
          wrongWay: '"Website won’t open -> Replace Ethernet cable!"',
          rightWay: '"ping 8.8.8.8 succeeded -> Layer 1/3 work -> Test DNS via nslookup!"',
          whyItHappens:
            'Successful raw IP reachability proves physical cabling and IP routing are intact.',
        },
        tryItMission:
          'Diagnose why `ping 8.8.8.8` succeeds while `apex.com` fails and pick the OSI layer & diagnostic command.',
      },
      knowledgeCheck: {
        question: 'A user can `ping 8.8.8.8` cleanly, yet `portal.company.com` shows DNS_PROBE_FINISHED_NXDOMAIN. Which layer is failing?',
        options: ['Layer 7 (DNS / Application Name Resolution)', 'Layer 1 (Unplugged Ethernet cable)', 'Dead CPU'],
        correctIndex: 0,
        explanation: 'Reaching `8.8.8.8` proves Layer 1–3 work; only hostname lookup (DNS) at Layer 7 failed.',
      },
      hints: [
        'Pick the Layer 7 / DNS option.',
        'Specify `nslookup` or `dig` in your command check.',
        'Explain why `ping 8.8.8.8` proves Layer 1 and Layer 3 already work.',
      ],
      referenceSolution: `1. Failing Layer: Layer 7 (DNS / Application resolution)
2. Diagnostic Command: Run nslookup apex.com (or dig) and inspect configured DNS servers.
3. Reasoning: Because pinging raw IP 8.8.8.8 succeeds, Layer 1 physical link and Layer 3 IP routing are working cleanly.`,
      deliverableFields: [
        {
          id: 'osi_layer',
          label: 'Failing OSI Layer',
          placeholder: 'Select layer',
          type: 'select',
          options: [
            'Layer 7 (DNS / Application resolution)',
            'Layer 1 (Unplugged Ethernet cable)',
            'Motherboard POST failure',
          ],
          helperText: 'Identify the failing layer when raw IP pings succeed.',
          validationRule: {
            exactOption: 'Layer 7 (DNS / Application resolution)',
            errorMessage: 'Pinging 8.8.8.8 proves L1–L3 work; failure is Layer 7 DNS.',
          },
        },
        {
          id: 'dns_cmd',
          label: 'Next CLI Diagnostic Command',
          placeholder: 'e.g., nslookup apex.com to verify DNS resolver replies',
          type: 'text',
          helperText: 'Include nslookup or dig.',
          validationRule: { minLength: 10, mustContain: ['nslookup'], errorMessage: 'Use nslookup to test DNS resolution.' },
        },
        {
          id: 'osi_reasoning',
          label: 'Why Layer 1–3 Are Cleared',
          placeholder: 'Explain what ping 8.8.8.8 proves...',
          type: 'textarea',
          helperText: 'Reference Layer 1 or Layer 3 IP routing (25+ chars).',
          validationRule: { minLength: 25, mustContain: ['ip'], errorMessage: 'Explain what successful raw IP ping proves.' },
        },
      ],
    },

    {
      id: 'cs-m5',
      number: '05',
      title: 'How DNS, DHCP & Default Gateways Connect Users',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'sandbox',
      runtime: 'js',
      lessonSummary:
        'Diagnose the classic help-desk alert: **"Connected, No Internet"**. Build `diagnoseNetwork(ip, gatewayPingOk, dnsOk)` in JS to catch APIPA self-assigned IPs (`169.254.x.x`), dead gateways, and broken DNS automatically.',
      keyConcepts: [
        'DHCP failure signature: link-local APIPA address starting with `169.254.`',
        'Default Gateway failure vs DNS name-resolution failure',
        'Deterministic step-by-step remediation routing',
      ],
      architectureNote:
        'Whenever Windows/macOS displays `169.254.x.x`, the laptop could not reach a DHCP server to lease a real IP—restarting the browser will never help until DHCP is restored.',
      deliverableTitle: 'Write diagnoseNetwork(ip, gatewayPingOk, dnsOk)',
      deliverablePrompt:
        'Return `"DHCP_FAILURE"` if `ip.startsWith("169.254.")`; `"GATEWAY_UNREACHABLE"` if `!gatewayPingOk`; `"DNS_FAILURE"` if `!dnsOk`; or `"HEALTHY"` if all three checks pass.',
      acceptanceCriteria: [
        'Catches 169.254.x.x APIPA addresses as DHCP_FAILURE',
        'Detects failed gateway ping as GATEWAY_UNREACHABLE',
        'Identifies !dnsOk as DNS_FAILURE and passes healthy state cleanly',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 05 of 12 · DHCP / Gateway / DNS Isolator',
        diagram: {
          type: 'branch-decision',
          title: '3-Step Network Triage Tree',
          caption: 'Test DHCP lease first (not 169.254.), then gateway reachability, then DNS lookup.',
          nodes: ['Check IP', '169.254.x.x?', 'DHCP_FAILURE', 'Test Gateway -> DNS'],
        },
        sections: [
          {
            heading: 'Spotting APIPA (`169.254.x.x`) Instantly',
            explanation:
              'When your laptop connects to Wi-Fi, it asks the DHCP server for an IP address. If nobody answers, the OS makes up a temporary `169.254.x.x` address that cannot reach the internet.',
            codeLanguage: 'javascript',
            codeSnippet: 'if (ip.startsWith("169.254.")) return "DHCP_FAILURE";',
          },
        ],
        liveExample: {
          title: 'Live Example: Checking APIPA & DNS States',
          description: 'Watch how testing DHCP -> Gateway -> DNS returns crisp diagnoses.',
          code: 'console.log("APIPA?", "169.254.12.8".startsWith("169.254."));',
          expectedOutput: 'APIPA? true',
        },
        commonMistake: {
          title: 'Checking DNS Before Checking DHCP / Gateway',
          wrongWay: 'If DHCP failed (169.254.), DNS always fails too—blaming DNS sends the wrong fix!',
          rightWay: 'Test in bottom-up order: DHCP (`169.254.`) -> Gateway -> DNS.',
          whyItHappens:
            'Higher layers depend on lower layers; fixing DNS does nothing without a valid DHCP IP.',
        },
        tryItMission:
          'Complete `diagnoseNetwork(ip, gatewayPingOk, dnsOk)` in bottom-up order.',
      },
      knowledgeCheck: {
        question: 'What does an IP address of `169.254.44.10` immediately tell a support technician?',
        options: [
          'The device failed to get a lease from the DHCP server (APIPA fallback)',
          'The device has gigabit fiber internet',
          'Only DNS failed while routing works fine',
        ],
        correctIndex: 0,
        explanation: '`169.254.0.0/16` is the automatic private fallback assigned when DHCP fails.',
      },
      hints: [
        'Check `if (ip.startsWith("169.254.")) return "DHCP_FAILURE";` first.',
        'Next check `if (!gatewayPingOk) return "GATEWAY_UNREACHABLE";`.',
        'Then `if (!dnsOk) return "DNS_FAILURE";`, otherwise `"HEALTHY"`.',
      ],
      referenceSolution: `function diagnoseNetwork(ip, gatewayPingOk, dnsOk) {
  if (ip.startsWith("169.254.")) {
    return "DHCP_FAILURE";
  }
  if (!gatewayPingOk) {
    return "GATEWAY_UNREACHABLE";
  }
  if (!dnsOk) {
    return "DNS_FAILURE";
  }
  return "HEALTHY";
}

console.log(diagnoseNetwork("169.254.8.1", false, false), diagnoseNetwork("10.0.1.25", true, false));`,
      workspaceFiles: [
        { filename: 'index.js', language: 'javascript', readOnly: false, content: 'Editable JavaScript lab' },
      ],
      starterCode: `function diagnoseNetwork(ip, gatewayPingOk, dnsOk) {
  // TODO: Check DHCP (169.254.), gatewayPingOk, and dnsOk in bottom-up order
  return "HEALTHY";
}

console.log(diagnoseNetwork("169.254.8.1", false, false), diagnoseNetwork("10.0.1.25", true, false));`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Detects APIPA DHCP failure first',
          expression: 'diagnoseNetwork("169.254.8.1", false, false) === "DHCP_FAILURE"',
          expectedDescription: 'Flags 169.254.x.x as DHCP_FAILURE',
        },
        {
          id: 't2',
          label: 'Isolates unreachable gateway vs DNS outage',
          expression:
            'diagnoseNetwork("10.0.1.25", false, false) === "GATEWAY_UNREACHABLE" && diagnoseNetwork("10.0.1.25", true, false) === "DNS_FAILURE"',
          expectedDescription: 'Separates gateway and DNS failures cleanly',
        },
        {
          id: 't3',
          label: 'Returns HEALTHY when all 3 layers pass',
          expression: 'diagnoseNetwork("10.0.1.25", true, true) === "HEALTHY"',
          expectedDescription: 'Returns HEALTHY when IP, gateway, and DNS pass',
        },
      ],
    },

    {
      id: 'cs-m6',
      number: '06',
      title: 'OS Permissions, Stuck Services & Disk Health',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 2 · Core Logic',
      mode: 'sandbox',
      runtime: 'js',
      lessonSummary:
        'Not all outages are networks—sometimes a laptop slows to a crawl or refuses saves because **disk usage hits 99%** or a **background spooler service hangs**. Code an OS health checker flagging disk, memory, and stopped services.',
      keyConcepts: [
        'Critical disk exhaustion (`diskUsedPct >= 95`) blocking temp/swap writes',
        'High memory pressure (`ramUsedPct >= 90`) triggering sluggish thrashing',
        'Detecting stopped required OS daemons/services',
      ],
      architectureNote:
        'A full drive (`>= 95%`) causes seemingly unrelated crashes across logins, updates, and browsers—always check free disk early.',
      deliverableTitle: 'Write auditEndpointHealth(diskUsedPct, ramUsedPct, serviceRunning)',
      deliverablePrompt:
        'Return `"DISK_CRITICAL"` if `diskUsedPct >= 95`; `"SERVICE_STOPPED"` if `!serviceRunning`; `"MEMORY_PRESSURE"` if `ramUsedPct >= 90`; or `"OK"` when healthy.',
      acceptanceCriteria: [
        'Flags >= 95% disk usage as DISK_CRITICAL',
        'Detects stopped service cleanly',
        'Flags >= 90% RAM pressure and returns OK cleanly otherwise',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 06 of 12 · Endpoint OS Health Checker',
        diagram: {
          type: 'branch-decision',
          title: 'Endpoint Health Guardrails',
          caption: 'Check full disk first (blocks OS logs/swap), then stopped critical services, then high RAM usage.',
          nodes: ['Telemetry', 'disk >= 95%?', 'DISK_CRITICAL', 'Check Service & RAM'],
        },
        sections: [
          {
            heading: 'Why 99% Full Disks Freeze Computers',
            explanation:
              'Operating systems constantly write temporary lock files, swap pages, and log entries. When `diskUsedPct >= 95`, applications crash silently or refuse to save.',
            codeLanguage: 'javascript',
            codeSnippet: 'if (diskUsedPct >= 95) return "DISK_CRITICAL";\nif (!serviceRunning) return "SERVICE_STOPPED";',
          },
        ],
        liveExample: {
          title: 'Live Example: Checking Critical Thresholds',
          description: 'See how threshold checks flag disk exhaustion first.',
          code: 'console.log(97 >= 95 ? "DISK_CRITICAL" : "OK");',
          expectedOutput: 'DISK_CRITICAL',
        },
        commonMistake: {
          title: 'Restarting Print Spooler Without Checking Full Disk',
          wrongWay: 'Restarting services repeatedly when the drive has 0 MB free.',
          rightWay: 'Check `diskUsedPct >= 95` first so temporary spool files actually have space to write.',
          whyItHappens:
            'Stopped services often crash immediately again if disk space is 100% full.',
        },
        tryItMission:
          'Complete `auditEndpointHealth(diskUsedPct, ramUsedPct, serviceRunning)` in index.js.',
      },
      knowledgeCheck: {
        question: 'Why should technicians check free disk space BEFORE repeatedly restarting crashed OS services?',
        options: [
          'A full disk blocks temporary files and causes services to crash right back down',
          'Full disks speed up CPU clock rate',
          'RAM usage turns off disk storage',
        ],
        correctIndex: 0,
        explanation: 'Zero free disk space starves OS daemons of temporary lock and log files.',
      },
      hints: [
        'Test `if (diskUsedPct >= 95) return "DISK_CRITICAL";` first.',
        'Next test `if (!serviceRunning) return "SERVICE_STOPPED";`.',
        'Next test `if (ramUsedPct >= 90) return "MEMORY_PRESSURE";`, else return `"OK"`.',
      ],
      referenceSolution: `function auditEndpointHealth(diskUsedPct, ramUsedPct, serviceRunning) {
  if (diskUsedPct >= 95) return "DISK_CRITICAL";
  if (!serviceRunning) return "SERVICE_STOPPED";
  if (ramUsedPct >= 90) return "MEMORY_PRESSURE";
  return "OK";
}

console.log(auditEndpointHealth(96, 50, true), auditEndpointHealth(45, 60, true));`,
      workspaceFiles: [
        { filename: 'index.js', language: 'javascript', readOnly: false, content: 'Editable JavaScript lab' },
      ],
      starterCode: `function auditEndpointHealth(diskUsedPct, ramUsedPct, serviceRunning) {
  // TODO: Flag DISK_CRITICAL (>=95), SERVICE_STOPPED, MEMORY_PRESSURE (>=90), or OK
  return "OK";
}

console.log(auditEndpointHealth(96, 50, true), auditEndpointHealth(45, 60, true));`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Flags critical disk exhaustion >= 95%',
          expression: 'auditEndpointHealth(96, 40, true) === "DISK_CRITICAL"',
          expectedDescription: 'Flags >= 95% disk usage immediately',
        },
        {
          id: 't2',
          label: 'Flags stopped service and high memory pressure',
          expression:
            'auditEndpointHealth(60, 40, false) === "SERVICE_STOPPED" && auditEndpointHealth(60, 92, true) === "MEMORY_PRESSURE"',
          expectedDescription: 'Reports SERVICE_STOPPED and MEMORY_PRESSURE cleanly',
        },
        {
          id: 't3',
          label: 'Clears healthy workstation cleanly',
          expression: 'auditEndpointHealth(55, 65, true) === "OK"',
          expectedDescription: 'Returns OK when all health metrics are safe',
        },
      ],
    },

    {
      id: 'cs-m7',
      number: '07',
      title: 'Active Ticket Intake & Diagnostic Questioning',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'deliverable',
      lessonSummary:
        'Users write *"My email is broken!"* without telling you what broke, when it started, or who else is affected. Master the 3-question intake formula: **Exact Error -> Scope (1 user vs whole team) -> Recent Changes**.',
      keyConcepts: [
        'Asking closed, non-jargon diagnostic questions',
        'Separating single-user local bugs from company-wide outages via scope',
        'Checking "what changed right before it broke?" (updates, VPN, password reset)',
      ],
      architectureNote:
        'Three calm, targeted questions save 30 minutes of back-and-forth messaging and let you classify Priority P1 vs P3 accurately.',
      deliverableTitle: 'Write an Intake Triage Checklist for a Vague Ticket',
      deliverablePrompt:
        'A user submits: *"Can’t log into anything today."* Write calm intake questions gathering scope (team vs solo), exact error text, and recent changes.',
      acceptanceCriteria: [
        'Asks whether teammates are also affected (blast-radius scope)',
        'Requests exact error code/message cleanly',
        'Avoids blaming the user in tone',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 07 of 12 · Empathy & Intake Triage',
        diagram: {
          type: 'flow',
          title: 'Turning Vague Tickets into Actionable Facts',
          caption: 'Three calm intake questions establish scope, exact symptom, and timeline immediately.',
          nodes: ['Vague Ticket', 'Scope + Error + Change?', 'Triage Ready'],
        },
        sections: [
          {
            heading: 'The 3 Golden Questions of IT Support',
            explanation:
              '1. **Scope**: Does this affect just your laptop or nearby teammates too?\n2. **Exact Symptom**: What exact error message or code appears on screen?\n3. **Timeline/Change**: Did anything change right before it stopped (password reset, OS update, new VPN)?',
          },
        ],
        liveExample: {
          title: 'Live Example: Empathetic Intake Reply',
          description: 'Short, numbered questions make it easy for stressed users to answer quickly.',
          code: 'Hi! Let’s get you back in quickly. Could you share:\n1. Exact error text shown?\n2. Are teammates nearby seeing the same issue?\n3. Did you recently reset your password or change Wi-Fi/VPN?',
          expectedOutput: 'Captures scope, exact error, and change context in 1 reply.',
        },
        commonMistake: {
          title: 'Asking Defensive or Technical Jargon Questions',
          wrongWay: '"What did you click to break Kerberos? Check your ARP cache."',
          rightWay: '"Could you share the exact message on screen and whether teammates see this too?"',
          whyItHappens:
            'Users freeze or feel blamed when confronted with jargon or accusatory phrasing.',
        },
        tryItMission:
          'Complete the calm intake reply, select the scope question, and note why recent changes matter.',
      },
      knowledgeCheck: {
        question: 'Why does an IT support technician ask "Are teammates nearby experiencing this too?" early?',
        options: [
          'To measure blast radius (1-user local bug vs P1 company-wide outage)',
          'To delay helping the user',
          'Because only groups get technical support',
        ],
        correctIndex: 0,
        explanation: 'Determining single-user vs multi-user scope immediately guides whether an incident is P3 or P1.',
      },
      hints: [
        'Ask clearly about `teammates` or `other users` and the exact error message.',
        'Select the scope + exact error + recent change option.',
        'Explain how checking recent changes (password reset / updates) narrows root cause.',
      ],
      referenceSolution: `1. Intake Reply: Happy to help right away! Could you confirm: (1) the exact error message shown, (2) whether teammates are seeing the same error, and (3) if you recently reset your password or updated your VPN/OS?
2. Priority Signal: Scope question distinguishing 1 user vs entire department/building
3. Why Recent Changes Matter: Identifying a recent password change, OS update, or certificate rotation immediately isolates the trigger.`,
      deliverableFields: [
        {
          id: 'intake_reply',
          label: 'Empathetic 3-Question Intake Message',
          placeholder: 'Ask for exact error, whether teammates are affected, and recent changes...',
          type: 'textarea',
          helperText: 'Keep tone calm and include error + teammates/scope (30+ chars).',
          validationRule: { minLength: 30, mustContain: ['error'], errorMessage: 'Ask for the exact error and scope calmly.' },
        },
        {
          id: 'scope_choice',
          label: 'Most Critical Triage Question for Blast Radius',
          placeholder: 'Select question',
          type: 'select',
          options: [
            'Scope question distinguishing 1 user vs entire department/building',
            'What color sticker is on the laptop lid',
            'How old the office desk chair is',
          ],
          helperText: 'Pick the blast-radius scope question.',
          validationRule: {
            exactOption: 'Scope question distinguishing 1 user vs entire department/building',
            errorMessage: 'Select the scope question measuring blast radius.',
          },
        },
        {
          id: 'change_note',
          label: 'Why Ask About Recent Changes?',
          placeholder: 'e.g., Password resets or OS updates often trigger immediate login issues',
          type: 'text',
          helperText: 'Mention password, update, or trigger.',
          validationRule: { minLength: 15, mustContain: ['update'], errorMessage: 'Explain how recent updates/changes narrow root cause.' },
        },
      ],
    },

    {
      id: 'cs-m8',
      number: '08',
      title: 'Priority Classification (P1–P3) & SLA Triage',
      durationMinutes: 35,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'sandbox',
      runtime: 'js',
      lessonSummary:
        'Now automate Lesson 07’s blast-radius scope into deterministic Service Desk **SLA routing**! When a core service is down or `>= 25` users are blocked, route immediately as **P1 (15-min SLA, page on-call)**.',
      keyConcepts: [
        'Severity tiers: P1 (Critical Outage), P2 (Team Disruption), P3 (Individual Request)',
        'Binding explicit SLA minutes (`15`, `60`, `240`) to each priority',
        'Triggering `pageOnCall: true` exclusively on P1 events',
      ],
      architectureNote:
        'Consistent P1–P3 logic ensures urgent production outages page engineers in seconds while low-impact solo tickets never wake on-call at 3 AM.',
      deliverableTitle: 'Build classifyIncident(usersAffected, coreServiceDown)',
      deliverablePrompt:
        'Return `{ priority: "P1", slaMinutes: 15, pageOnCall: true }` when `coreServiceDown || usersAffected >= 25`; `{ priority: "P2", slaMinutes: 60, pageOnCall: false }` when `usersAffected >= 5`; else `{ priority: "P3", slaMinutes: 240, pageOnCall: false }`.',
      acceptanceCriteria: [
        'Triggers P1 (15 min SLA, pageOnCall true) when coreServiceDown is true',
        'Triggers P1 when usersAffected >= 25 even if coreServiceDown is false',
        'Assigns P2 (5..24 users) and P3 (<5 users) with pageOnCall false',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 08 of 12 · Deterministic SLA Router',
        diagram: {
          type: 'branch-decision',
          title: 'P1–P3 SLA Classification Tree',
          caption: 'Evaluate P1 blast radius first, then team-level P2, falling back cleanly to solo P3.',
          nodes: ['Incident Intake', 'Core Down or >=25?', 'P1 (15m + Page)', 'Check >=5 -> P2/P3'],
        },
        sections: [
          {
            heading: 'Why Core Service Failure = P1 Even for 1 Reporter',
            explanation:
              'If the company SSO login server crashes at 6:00 AM, maybe only 1 early riser has reported it so far—yet `coreServiceDown === true` tells your router to escalate to `P1` immediately before 500 staff log on at 9 AM!',
            codeLanguage: 'javascript',
            codeSnippet: 'if (coreServiceDown || usersAffected >= 25) {\n  return { priority: "P1", slaMinutes: 15, pageOnCall: true };\n}',
          },
        ],
        liveExample: {
          title: 'Live Example: Solo Ticket vs Core Outage',
          description: 'Verify `coreServiceDown: true` escalates to P1 even with `usersAffected: 1`.',
          code: 'const isP1 = (users, down) => down || users >= 25;\nconsole.log("1 user + SSO down -> P1?", isP1(1, true));\nconsole.log("1 user + printer jam -> P1?", isP1(1, false));',
          expectedOutput: '1 user + SSO down -> P1? true\n1 user + printer jam -> P1? false',
        },
        commonMistake: {
          title: 'Using `&&` Instead of `||` in the P1 Guard',
          wrongWay: 'if (coreServiceDown && usersAffected >= 25)  // Misses single-reporter core outages!',
          rightWay: 'if (coreServiceDown || usersAffected >= 25)',
          whyItHappens:
            'Either condition alone represents critical organizational risk.',
        },
        tryItMission:
          'Complete `classifyIncident(usersAffected, coreServiceDown)` in index.js.',
      },
      knowledgeCheck: {
        question: 'If 1 user reports the company SSO server is offline (`coreServiceDown = true`), what priority should it receive?',
        options: ['P1 (15 min SLA, page on-call)', 'P3 (240 min SLA)', 'Low priority backlog'],
        correctIndex: 0,
        explanation: 'A downed core service affects everyone trying to sign in, requiring P1 immediate action.',
      },
      hints: [
        'Use `if (coreServiceDown || usersAffected >= 25)` for P1.',
        'Use `if (usersAffected >= 5)` for P2 (`slaMinutes: 60`, `pageOnCall: false`).',
        'Default to P3 (`slaMinutes: 240`, `pageOnCall: false`).',
      ],
      referenceSolution: `function classifyIncident(usersAffected, coreServiceDown) {
  if (coreServiceDown || usersAffected >= 25) {
    return { priority: "P1", slaMinutes: 15, pageOnCall: true };
  }
  if (usersAffected >= 5) {
    return { priority: "P2", slaMinutes: 60, pageOnCall: false };
  }
  return { priority: "P3", slaMinutes: 240, pageOnCall: false };
}

console.log(classifyIncident(1, true), classifyIncident(8, false), classifyIncident(2, false));`,
      workspaceFiles: [
        { filename: 'index.js', language: 'javascript', readOnly: false, content: 'Editable JavaScript lab' },
      ],
      starterCode: `function classifyIncident(usersAffected, coreServiceDown) {
  // TODO: Return P1 (15m + pageOnCall), P2 (60m), or P3 (240m)
  return { priority: "P3", slaMinutes: 240, pageOnCall: false };
}

console.log(classifyIncident(1, true), classifyIncident(8, false), classifyIncident(2, false));`,
      sandboxTests: [
        {
          id: 't1',
          label: 'Pages on-call for core outages even with 1 reporter',
          expression:
            'classifyIncident(1, true).priority === "P1" && classifyIncident(1, true).pageOnCall === true && classifyIncident(1, true).slaMinutes === 15',
          expectedDescription: 'coreServiceDown triggers P1 + 15m + pageOnCall',
        },
        {
          id: 't2',
          label: 'Escalates >= 25 users affected to P1',
          expression: 'classifyIncident(30, false).priority === "P1"',
          expectedDescription: '>= 25 users sets priority P1',
        },
        {
          id: 't3',
          label: 'Routes P2 (5..24) and P3 (<5) without paging on-call',
          expression:
            'classifyIncident(8, false).priority === "P2" && classifyIncident(8, false).slaMinutes === 60 && classifyIncident(2, false).priority === "P3" && classifyIncident(2, false).pageOnCall === false',
          expectedDescription: 'Accurately assigns P2 (60m) and P3 (240m)',
        },
      ],
    },

    {
      id: 'cs-m9',
      number: '09',
      title: 'Zero-Trust Access & Secure MFA Recovery',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 3 · Applied Systems',
      mode: 'deliverable',
      lessonSummary:
        'Social engineers love tricking rushed help-desk agents into disabling MFA over the phone! Enforce **Zero-Trust Identity Verification** and never send plaintext temporary passwords in email.',
      keyConcepts: [
        'Out-of-band identity verification (manager + employee directory + live video/ID)',
        'Why texting or emailing plaintext passwords violates security policy',
        'Issuing short-lived one-time MFA enrollment tokens cleanly',
      ],
      architectureNote:
        'Help-desk urgency is the #1 weapon attackers use—never bypass identity verification under pressure.',
      deliverableTitle: 'Design a Zero-Trust MFA Reset Verification SOP',
      deliverablePrompt:
        'Respond to an urgent executive requesting an MFA phone reset over chat: select the compliant verification step, set a short token expiry (15–30 minutes), and state why plaintext passwords are forbidden.',
      acceptanceCriteria: [
        'Selects multi-factor out-of-band identity verification',
        'Enforces short-lived token TTL between 15 and 30 minutes',
        'Prohibits sending plaintext passwords or bypassing MFA',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 09 of 12 · Zero-Trust Identity Gate',
        diagram: {
          type: 'branch-decision',
          title: 'Zero-Trust MFA Reset Gate',
          caption: 'Never reset MFA from unverified chat; verify out-of-band first, then issue a 15-min one-time setup link.',
          nodes: ['MFA Reset Request', 'Out-of-Band Video ID?', '15m One-Time Token', 'Deny Unverified'],
        },
        sections: [
          {
            heading: 'Why Chat Messages Are Never Proof of Identity',
            explanation:
              'If an attacker compromises Slack or spoofs an executive’s phone number, granting an instant MFA reset hands them full company access. Always verify via trusted out-of-band video + manager/HR confirmation and issue an expiring enrollment token.',
          },
        ],
        liveExample: {
          title: 'Live Example: Compliant Recovery Policy',
          description: 'Verification + short expiry + zero plaintext credentials.',
          code: '1. Verify caller out-of-band via live video + photo ID / manager sign-off.\n2. Issue single-use MFA enrollment token expiring in 15 minutes.\n3. Never email plaintext passwords or disable MFA permanently.',
          expectedOutput: 'Zero social-engineering exposure.',
        },
        commonMistake: {
          title: 'Emailing Temporary Passwords or Turning Off MFA for VIPs',
          wrongWay: '"Sure CEO! I disabled MFA and emailed password123."',
          rightWay: '"Happy to help—let’s complete a quick 2-min video ID check so I can issue a 15-min one-time enrollment link."',
          whyItHappens:
            'VIP urgency leads unguarded agents to waive the very checks that protect high-privilege accounts.',
        },
        tryItMission:
          'Select the zero-trust verification protocol, enter a 15–30 min TTL, and explain plaintext credential risk.',
      },
      knowledgeCheck: {
        question: 'What is the safest way to handle an urgent MFA phone replacement request?',
        options: [
          'Verify identity out-of-band via video/manager check, then issue a short-lived one-time enrollment link',
          'Disable MFA permanently for 30 days',
          'Email a reusable plaintext password to their personal Gmail',
        ],
        correctIndex: 0,
        explanation: 'Out-of-band verification plus short-lived single-use links stop account-takeover impersonators.',
      },
      hints: [
        'Pick the out-of-band video/directory verification option.',
        'Set TTL between `15` and `30` minutes.',
        'Explain why plaintext email passwords can be intercepted or forwarded.',
      ],
      referenceSolution: `1. Verification Policy: Out-of-band live video ID + manager/HR confirmation before issuing a 15-min one-time token
2. Token TTL: 15 minutes
3. Security Rationale: Emailing plaintext passwords leaves unencrypted secrets sitting in inboxes indefinitely, whereas verified short-lived enrollment tokens protect against impersonation.`,
      deliverableFields: [
        {
          id: 'mfa_policy',
          label: 'Zero-Trust Verification Method',
          placeholder: 'Select verification method',
          type: 'select',
          options: [
            'Out-of-band live video ID + manager/HR confirmation before issuing a 15-min one-time token',
            'Email a permanent plaintext password upon Slack DM request',
            'Turn off MFA company-wide until Monday',
          ],
          helperText: 'Select the secure Zero-Trust verification path.',
          validationRule: {
            exactOption: 'Out-of-band live video ID + manager/HR confirmation before issuing a 15-min one-time token',
            errorMessage: 'Require out-of-band verification + short-lived enrollment token.',
          },
        },
        {
          id: 'token_ttl',
          label: 'Enrollment Token Expiry (minutes)',
          placeholder: 'e.g., 15',
          type: 'number',
          helperText: 'Choose a tight expiry window between 5 and 30 minutes.',
          validationRule: { minNumber: 5, maxNumber: 30, errorMessage: 'Keep one-time token TTL between 5 and 30 minutes.' },
        },
        {
          id: 'plaintext_risk',
          label: 'Why Plaintext Passwords Are Forbidden',
          placeholder: 'Explain interception and persistent inbox exposure risks...',
          type: 'textarea',
          helperText: 'Mention plaintext or inbox risk (25+ chars).',
          validationRule: { minLength: 25, mustContain: ['plaintext'], errorMessage: 'Explain plaintext password risks.' },
        },
      ],
    },

    {
      id: 'cs-m10',
      number: '10',
      title: 'Writing Crisp Tier-2 Escalation Handoffs',
      durationMinutes: 30,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'deliverable',
      lessonSummary:
        'When a ticket requires Tier-2 network or infrastructure engineers, never dump `"user broken please fix"`. Write a crisp handoff packing **Impact, Verified Layers, CLI Evidence, and Steps Already Tried**.',
      keyConcepts: [
        'Packaging OSI-tested evidence (`ping`, `nslookup`, `ipconfig`) cleanly',
        'Preventing Tier-2 engineers from repeating steps you already verified',
        'Stating exact timestamps and blast radius',
      ],
      architectureNote:
        'Clean Tier-1 handoffs cut mean-time-to-resolution (MTTR) in half because specialists jump straight into root fixes.',
      deliverableTitle: 'Format a Complete Tier-2 Escalation Summary',
      deliverablePrompt:
        'Package a persistent EU office DNS failure into a crisp Tier-2 escalation note stating scope, OSI layers passed vs failed, and exact CLI outputs tested.',
      acceptanceCriteria: [
        'States clear blast radius and start timestamp',
        'Lists Layer 1/3 tests passed vs Layer 7 DNS failed',
        'Prevents duplicate troubleshooting by recording commands run',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 10 of 12 · Tier-2 Escalation Brief',
        diagram: {
          type: 'flow',
          title: 'What Tier-2 Needs in 15 Seconds',
          caption: 'A great handoff bundles scope, passed OSI layers, failed layer, and exact CLI logs.',
          nodes: ['Scope & SLA', 'Passed L1–L3 Proof', 'Failed L7 + Logs'],
        },
        sections: [
          {
            heading: 'Respecting Escalation Engineers’ Time',
            explanation:
              'Writing *"Tried everything, doesn’t work"* forces Tier-2 to re-ask the user every single question. Writing *"32 users in Berlin (P1); ping 10.4.0.1 & 8.8.8.8 PASS; nslookup internal.corp TIMES OUT against 10.4.0.53"* lets them fix DNS server `10.4.0.53` immediately.',
          },
        ],
        liveExample: {
          title: 'Live Example: Crisp Escalation Block',
          description: 'Notice zero fluff—just impact, evidence, and tested steps.',
          code: 'Scope: 32 users Berlin (P1, started 09:14 UTC)\nPassed: L1 link + L3 ping 8.8.8.8\nFailed: L7 nslookup internal.corp timeout on DNS 10.4.0.53',
          expectedOutput: 'Instant Tier-2 root isolation.',
        },
        commonMistake: {
          title: 'Escalating Without Recording Tests Already Run',
          wrongWay: '"Please check Bob’s network, he can’t open websites."',
          rightWay: '"Scope: 32 users; ping 8.8.8.8 passes; nslookup fails on 10.4.0.53."',
          whyItHappens:
            'Missing evidence forces Tier-2 back to square one, doubling outage minutes.',
        },
        tryItMission:
          'Select the handoff format and write a concise evidence note including `ping` and `nslookup`.',
      },
      knowledgeCheck: {
        question: 'What turns an unhelpful escalation note into an immediate Tier-2 fix?',
        options: [
          'Including blast-radius scope, passed vs failed OSI checks, and exact CLI outputs tried',
          'Adding urgent all-caps emojis without logs',
          'Deleting the user’s original error screenshot',
        ],
        correctIndex: 0,
        explanation: 'Concrete scope and CLI evidence eliminate duplicate troubleshooting.',
      },
      hints: [
        'Include `ping` and `nslookup` in your CLI evidence field.',
        'Pick the structured Scope + Passed/Failed OSI + CLI output option.',
        'Document how many users are affected so SLA priority is clear.',
      ],
      referenceSolution: `1. Impact & Scope: 32 EU office staff blocked (P1, started 09:14 UTC).
2. Handoff Structure: Scope & SLA + Passed/Failed OSI Layers + Exact CLI Commands Tried
3. Evidence Log: L1 Ethernet/Wi-Fi up, L3 ping 8.8.8.8 passes cleanly, L7 nslookup portal.corp times out against DNS resolver 10.4.0.53.`,
      deliverableFields: [
        {
          id: 'handoff_structure',
          label: 'Essential Tier-2 Handoff Template',
          placeholder: 'Select template',
          type: 'select',
          options: [
            'Scope & SLA + Passed/Failed OSI Layers + Exact CLI Commands Tried',
            'Subject line "URGENT PLS FIX" with zero logs',
            'Full user chat history without any summary',
          ],
          helperText: 'Pick the professional escalation format.',
          validationRule: {
            exactOption: 'Scope & SLA + Passed/Failed OSI Layers + Exact CLI Commands Tried',
            errorMessage: 'Select the structured Scope + OSI + CLI template.',
          },
        },
        {
          id: 'cli_evidence',
          label: 'CLI Evidence Block',
          placeholder: 'e.g., ping 8.8.8.8 succeeded; nslookup portal.corp timed out on 10.4.0.53',
          type: 'textarea',
          helperText: 'Cite both ping and nslookup results (25+ chars).',
          validationRule: { minLength: 25, mustContain: ['ping', 'nslookup'], errorMessage: 'Include both ping and nslookup findings.' },
        },
      ],
    },

    {
      id: 'cs-m11',
      number: '11',
      title: 'Post-Incident Root Cause & Knowledge Base (KB) Articles',
      durationMinutes: 25,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'deliverable',
      lessonSummary:
        'Fixing an issue once is good; turning the fix into a searchable **Knowledge Base (KB) article** stops the next 50 tickets from ever being filed! Practice blameless postmortems and concise KB checklists.',
      keyConcepts: [
        'Blameless Root Cause Analysis (fixing broken processes, not shaming staff)',
        'Writing searchable KB titles matching what users actually type',
        'Adding clear Verification Steps after the fix',
      ],
      architectureNote:
        'Self-service KB articles titled with exact error codes (`"Fix DNS_PROBE_FINISHED_NXDOMAIN on Office VPN"`) deflect 20–30% of repeat service desk volume.',
      deliverableTitle: 'Write a Searchable KB Article & Blameless RCA Note',
      deliverablePrompt:
        'Convert our `/26` DHCP lease exhaustion fix (upgrading to `/24` = 254 usable hosts) into a searchable KB summary and preventive action.',
      acceptanceCriteria: [
        'Identifies root cause accurately (/26 62-host limit exhausted)',
        'Uses a blameless preventive engineering fix (/24 expansion)',
        'Includes exact user-searchable symptom keywords',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 11 of 12 · Searchable KB & RCA Loop',
        diagram: {
          type: 'flow',
          title: 'From Incident Fix to Ticket Deflection',
          caption: 'Document root cause, step-by-step fix, and verification so repeat incidents drop to zero.',
          nodes: ['Incident Resolved', 'Blameless RCA', 'Published KB Guide'],
        },
        sections: [
          {
            heading: 'Blameless Postmortems Improve Systems',
            explanation:
              'Never write *"Bob forgot to expand the pool."* Write *"The /26 subnet allowed only 62 hosts while Monday attendance reached 75; expanding to /24 (254 hosts) and adding 80%-utilization alerts prevents recurrence."*',
          },
        ],
        liveExample: {
          title: 'Live Example: Searchable KB Entry',
          description: 'Clear symptom title + 2-step resolution + prevention.',
          code: 'Title: Fix "169.254.x.x Connected, No Internet" on Floor 2 Wi-Fi\nCause: /26 pool (62 usable IPs) exhausted at 75 devices.\nPrevention: Expanded subnet to /24 (254 usable) with 80% DHCP alert.',
          expectedOutput: 'Zero repeat Monday morning lockouts.',
        },
        commonMistake: {
          title: 'Writing Cryptic Internal Titles Users Never Search',
          wrongWay: '"KB-902 Subnet Migration Ticket"',
          rightWay: '"Fix 169.254 No Internet Error on Office Wi-Fi"',
          whyItHappens:
            'Employees search by the exact symptom they see, not internal ticket codes.',
        },
        tryItMission:
          'Author a searchable KB title, explain the `/26` exhaustion root cause, and select blameless prevention.',
      },
      knowledgeCheck: {
        question: 'What makes a Knowledge Base (KB) article actually reduce repeat help-desk tickets?',
        options: [
          'Using user-facing error keywords in the title alongside verified step-by-step resolution',
          'Hiding KB articles from employees',
          'Blaming an individual employee by name in the summary',
        ],
        correctIndex: 0,
        explanation: 'Searchable symptom titles and clear verification steps let users and agents solve repeats fast.',
      },
      hints: [
        'Include `169.254` or `No Internet` in your KB title.',
        'Reference `/26` (62 usable) vs `/24` (254 usable) in your root cause.',
        'Pick the blameless system prevention option.',
      ],
      referenceSolution: `1. KB Title: Fix "169.254.x.x Connected, No Internet" on Office Wi-Fi
2. Blameless Prevention: Expand subnet to /24 (254 hosts) and configure automated 80% DHCP pool utilization alerting
3. Root Cause Summary: The floor Wi-Fi /26 subnet provided only 62 usable hosts, exhausting DHCP leases whenever >62 devices connected; expanding to /24 restores 254 usable addresses.`,
      deliverableFields: [
        {
          id: 'kb_title',
          label: 'Searchable KB Article Title',
          placeholder: 'e.g., Fix 169.254 No Internet Error on Office Wi-Fi',
          type: 'text',
          helperText: 'Use symptom words users actually search (e.g., No Internet / 169.254).',
          validationRule: { minLength: 15, mustContain: ['169.254'], errorMessage: 'Include 169.254 symptom keywords.' },
        },
        {
          id: 'rca_focus',
          label: 'Blameless Preventive Action',
          placeholder: 'Select prevention approach',
          type: 'select',
          options: [
            'Expand subnet to /24 (254 hosts) and configure automated 80% DHCP pool utilization alerting',
            'Reprimand the first user who reported Wi-Fi failing',
            'Leave the /26 pool unchanged and reboot routers daily',
          ],
          helperText: 'Select the blameless infrastructure improvement.',
          validationRule: {
            exactOption: 'Expand subnet to /24 (254 hosts) and configure automated 80% DHCP pool utilization alerting',
            errorMessage: 'Choose the permanent /24 capacity + automated alert prevention.',
          },
        },
        {
          id: 'rca_summary',
          label: 'Root Cause Note (/26 vs /24 Capacity)',
          placeholder: 'Explain 62 usable host exhaustion and 254 host expansion...',
          type: 'textarea',
          helperText: 'Reference 62 and 254 hosts cleanly (25+ chars).',
          validationRule: { minLength: 25, mustContain: ['62'], errorMessage: 'Mention the 62 usable host limit on /26.' },
        },
      ],
    },

    {
      id: 'cs-m12',
      number: '12',
      title: 'Capstone: Enterprise Service Desk Operations Playbook',
      durationMinutes: 50,
      scaffoldingStage: 'Stage 4 · Project Assembly',
      mode: 'rubric',
      lessonSummary:
        'Connect all 11 building blocks—POST hardware checks, CIDR `/24`/`/26` subnetting, OSI bottom-up isolation, `169.254.` DHCP vs DNS triage, `P1–P3` SLA routing, and Zero-Trust MFA recovery—into a complete Service Desk Playbook.',
      keyConcepts: [
        'Hardware POST vs OS vs bottom-up OSI Layer 1–7 isolation',
        'CIDR capacity math and DHCP/Gateway/DNS fault trees',
        'Deterministic P1–P3 SLA triage and Zero-Trust identity verification',
      ],
      architectureNote:
        'A cohesive IT Service Desk Playbook guarantees calm, repeatable, and security-first resolution across every workstation and network incident.',
      deliverableTitle: 'Submit Enterprise IT Service Desk Playbook',
      deliverablePrompt:
        'Write your comprehensive Service Desk Capstone Playbook covering: (1) Hardware POST & bottom-up OSI network isolation (DHCP `169.254` vs Gateway vs DNS + CIDR `/24`/`/26` capacity), (2) Deterministic `P1–P3` SLA routing & escalation handoffs, and (3) Zero-Trust MFA verification without plaintext passwords.',
      acceptanceCriteria: [
        'Covers POST diagnostics, CIDR usable host math, and OSI bottom-up isolation',
        'Documents P1 (15m + on-call) vs P2/P3 SLA blast-radius routing',
        'Enforces out-of-band MFA identity verification and forbids plaintext credentials',
        'Scores >= 80 / 100 on the Mentor Rubric to earn your Computer Support Certificate',
      ],
      handbook: {
        puzzlePiece: 'Puzzle Piece 12 of 12 · Complete IT Operations Capstone',
        diagram: {
          type: 'capstone-assembly',
          title: 'Full IT Service Desk Operating System',
          caption: 'Hardware POST, CIDR/OSI networking, deterministic SLAs, and Zero-Trust recovery form one playbook.',
          nodes: ['POST & CIDR/OSI', 'P1-P3 SLA Triage', 'Zero-Trust MFA + KB'],
        },
        sections: [
          {
            heading: 'Look Back Across All 11 Operations Blocks',
            explanation:
              'You built from hardware POST beeps and binary IPv4 octets up through `/24`/`/26` CIDR calculators, OSI Layer 1–7 checks, `169.254` DHCP/DNS isolation, endpoint disk checks, `P1–P3` SLA routers, and Zero-Trust MFA resets.',
          },
        ],
        liveExample: {
          title: 'Live Example: Service Desk Playbook Structure',
          description: 'Hit Hardware/Networking, SLA Routing, and Zero-Trust MFA cleanly.',
          code: '1. Hardware & Network Diagnostics: Separate pre-boot POST faults from OS issues; calculate CIDR usable hosts (2^(32-prefix)-2) and isolate DHCP (169.254.), gateway, and DNS bottom-up via OSI.\n2. P1-P3 SLA & Handoffs: Route core outages or >=25 users as P1 (15m + page on-call), attach CLI ping/nslookup evidence for Tier-2, and publish KB articles.\n3. Zero-Trust Security: Verify MFA resets out-of-band via live video/HR check and short-lived tokens—never plaintext email passwords.',
          expectedOutput: 'Verified >= 80/100 Capstone Rubric Score',
        },
        commonMistake: {
          title: 'Skipping Security Boundaries Under Urgency',
          wrongWay: '"We fix tickets fast by resetting MFA immediately on Slack DMs."',
          rightWay: '"We verify identity out-of-band first, apply P1–P3 blast-radius SLAs, and isolate OSI bottom-up."',
          whyItHappens:
            'Speed without Zero-Trust verification creates catastrophic breach openings.',
        },
        tryItMission:
          'Write your >= 65-word Service Desk Operations Playbook and click Verify & Mint Certificate.',
      },
      knowledgeCheck: {
        question: 'Which core pillars define a world-class IT Service Desk Playbook?',
        options: [
          'Bottom-up POST & CIDR/OSI diagnostics, blast-radius P1–P3 SLAs, and Zero-Trust MFA identity checks',
          'Immediate OS wipes and bypassing MFA for urgent tickets',
          'Escalating all tickets without checking cables or ping',
        ],
        correctIndex: 0,
        explanation: 'Combining systematic bottom-up troubleshooting, objective SLAs, and Zero-Trust identity protects uptime and security.',
      },
      hints: [
        'Mention `osi`, `cidr` / `subnet`, and `dns` / `dhcp` in Criterion 1.',
        'Mention `p1`, `sla`, and `blast` / `users` in Criterion 2.',
        'Mention `mfa`, `zero-trust` / `out-of-band`, and `plaintext` in Criterion 3.',
      ],
      referenceSolution: `1. Hardware POST & Bottom-Up Network Diagnostics: Technicians isolate pre-boot POST faults before OS reinstalls, compute accurate CIDR usable hosts (62 on /26, 254 on /24), and isolate DHCP (169.254.x.x), gateway, and DNS faults bottom-up across the OSI model.
2. Deterministic P1-P3 SLA Routing & Handoffs: Core service outages or >=25 affected users trigger P1 (15-minute SLA, page on-call), while Tier-2 escalations attach verified ping/nslookup CLI logs and feed blameless KB articles.
3. Zero-Trust MFA Recovery: All MFA resets require out-of-band identity verification before issuing a 15-minute one-time enrollment token, strictly prohibiting plaintext passwords or unverified chat resets.`,
      rubricCriteria: [
        {
          id: 'r1',
          criterion: 'POST, CIDR Subnet & Bottom-Up OSI Diagnostics',
          weight: 35,
          targetDescription:
            'Covers hardware POST checks, CIDR usable host calculation, and OSI DHCP/DNS isolation.',
          requiredKeywordHints: ['osi', 'cidr', 'dns'],
          minWordCount: 15,
        },
        {
          id: 'r2',
          criterion: 'Deterministic P1–P3 SLA & Tier-2 Handoffs',
          weight: 35,
          targetDescription:
            'Details blast-radius P1–P3 routing, 15m/60m/240m SLAs, and CLI escalation evidence.',
          requiredKeywordHints: ['p1', 'sla', 'users'],
          minWordCount: 15,
        },
        {
          id: 'r3',
          criterion: 'Zero-Trust MFA & Credential Security',
          weight: 30,
          targetDescription:
            'Enforces out-of-band MFA verification, short-lived tokens, and bans plaintext passwords.',
          requiredKeywordHints: ['mfa', 'out-of-band', 'plaintext'],
          minWordCount: 15,
        },
      ],
    },
  ],
};
