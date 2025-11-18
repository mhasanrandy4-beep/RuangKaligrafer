# Ruang Kaligrafer - Design Guidelines

## Design Approach

**Hybrid Approach**: Custom educational platform drawing inspiration from modern learning apps (Duolingo's gamification, Skillshare's content presentation) while incorporating Indonesian cultural aesthetics reflecting calligraphy's artistic nature.

**Core Principles**:
- Cultural elegance meets modern functionality
- Gamified learning with clear progress visualization
- Clean, distraction-free learning environment
- Trust-building design for tutor-student relationship

## Color System

Based on the provided Ruang Kaligrafer logo palette:
- **Primary Gold**: Accent and highlights (buttons, badges, active states)
- **Deep Blue**: Headers, primary text, navigation
- **Neutral Grays**: Backgrounds, cards, secondary text
- **Success Green**: Positive feedback, completed tasks
- **Alert Red**: Credit warnings, errors
- **White/Light**: Main backgrounds, card surfaces

## Typography

**Font Families** (Google Fonts):
- **Display/Headers**: Playfair Display (elegant, calligraphic feel) - weights: 600, 700
- **Body/UI**: Inter (modern, highly legible) - weights: 400, 500, 600

**Hierarchy**:
- Page Titles: text-4xl md:text-5xl font-bold (Playfair)
- Section Headers: text-2xl md:text-3xl font-semibold (Playfair)
- Card Titles: text-lg font-semibold (Inter)
- Body Text: text-base (Inter)
- Captions/Meta: text-sm text-gray-600 (Inter)

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4 to p-6
- Section spacing: py-8 to py-12
- Card gaps: gap-4 to gap-6
- Container padding: px-4 md:px-6

**Grid System**:
- Max container width: max-w-7xl
- Dashboard: 3-column grid (sidebar, main, widget panel) on desktop
- Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Mobile-first: always stack to single column on small screens

## Component Library

### Navigation & Layout
**Top Navigation Bar**:
- Fixed header with logo left, navigation center, credit balance + profile right
- Height: h-16, backdrop blur for modern feel
- Active tab indicator with gold underline (border-b-2)

**Sidebar (Desktop)**:
- Width: w-64, collapsible to w-20 (icons only)
- Icons from Heroicons
- Active state: background gold with subtle shadow

### Dashboard Components

**Home Tab Components**:
1. **Progress Tracker Card**: Large card (h-64) with circular progress visualization, statistics grid below
2. **Tips & Tricks**: Carousel/slider with cards (h-48), swipeable on mobile
3. **Daily Motivation**: Quote card with elegant typography, subtle gradient background

**Video Learning Tab**:
- Video grid: 2 columns on tablet, 3 on desktop
- YouTube embed cards with thumbnail preview, title, duration badge
- Aspect ratio: 16:9 maintained
- Player opens in modal overlay (full-screen option)

**Submit Work Section**:
- Drag-and-drop upload zone (h-64) with dashed border
- Preview area showing uploaded image
- Credit cost indicator (-5 credits) prominently displayed
- Tutor selection dropdown
- Submit button disabled if insufficient credits

**Credit Purchase Modal**:
- Package cards in 2x2 grid
- Each package shows: credit amount, price, "best value" badge for mid-tier
- Integration with Stripe checkout button
- Current balance displayed at top

### Image Editor (Tutor View)

**Canvas Layout**:
- Left sidebar: Tool palette (w-16) - pen, eraser, color picker, zoom controls
- Main canvas: Centered student work with controls overlay
- Right panel (w-80): Student info, submission details, previous feedback
- Bottom toolbar: Undo, redo, submit to student button (gold, prominent)

**Tool Specifications**:
- Pen tool with stroke width slider (1-10px range)
- Pen stabilizer toggle switch
- Color picker: Preset palette + custom color input
- Zoom: 25%-400% with reset button
- All tools with icon + label on hover

### Progress Tracker Tab

**Visualization Components**:
- Timeline view: Vertical line with submission cards
- Statistics dashboard: 4-column grid showing total submissions, corrections received, average score, streak days
- Chart area: Line graph showing progress over time (using Chart.js or similar)
- Filter controls: Date range, submission status

### Leaderboard Tab

**Layout**:
- Top 3 podium cards with medals (large, visual prominence)
- Ranked list below: Avatar, name, points, rank badge
- Current user highlight (if in top 50)
- Filters: Weekly, monthly, all-time
- Pagination for long lists

### Cards & Containers

**Standard Card**:
- Rounded corners: rounded-lg
- Shadow: shadow-md, hover:shadow-lg transition
- Padding: p-6
- Border: Optional subtle border (border border-gray-200)

**Status Badges**:
- Pill-shaped: rounded-full px-3 py-1 text-sm
- Colors by status: Pending (gray), In Review (blue), Completed (green), Needs Revision (amber)

### Forms & Inputs

**Text Inputs**:
- Height: h-12
- Border: border-2 border-gray-300, focus:border-blue-500
- Rounded: rounded-lg
- Padding: px-4

**Buttons**:
- Primary (Gold): Prominent actions, h-12, rounded-lg, font-semibold
- Secondary (Blue outline): Alternative actions
- Disabled state: opacity-50, cursor-not-allowed

### Authentication Pages

**Login/Register**:
- Centered card (max-w-md) on colored gradient background
- Logo at top
- Role selector: Toggle between Student/Tutor
- Social auth buttons (Google, email)
- Tutor disclaimer: "Tutors require admin verification"

## Images

**Hero Images**:
- Not needed - this is a dashboard application

**Content Images**:
- **Student Submissions**: Display at natural aspect ratio within cards, max-width container
- **Tutor Profile**: Circular avatars (w-12 h-12 for small, w-24 h-24 for profile pages)
- **Empty States**: Illustrations for empty leaderboard, no submissions yet (use undraw.co style illustrations)
- **Motivational Images**: Calligraphy artwork samples as background for tips/motivation cards (low opacity overlay for text readability)

## Responsive Behavior

**Breakpoints**:
- Mobile: Default (single column)
- Tablet: md: (768px) - 2 columns where appropriate
- Desktop: lg: (1024px) - Full 3-column layouts, sidebar visible

**Mobile Adaptations**:
- Bottom navigation replaces sidebar
- Hamburger menu for secondary navigation
- Cards stack vertically
- Image editor: Simplified toolbar, tools in drawer

## Animations

**Minimal & Purposeful**:
- Page transitions: Fade in (duration-200)
- Card hover: Shadow lift (transition-shadow)
- Progress bars: Smooth fill animation
- Success feedback: Checkmark animation on submission
- NO scroll-triggered animations