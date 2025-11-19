# Planning Guide

A manual push-up tracking application that enables clean, comprehensible, and motivating documentation of training without interrupting workout flow.

**Experience Qualities**:
1. **Effortless** - Every action should be achievable with minimal taps, allowing users to log during workout rest periods without breaking their flow
2. **Motivating** - Progress visualization and achievements should provide dopamine hits that encourage consistency and progressive overload
3. **Trustworthy** - Data persistence and reliability are paramount; users must never lose their training history

**Complexity Level**: Light Application (multiple features with basic state)
This app requires state management across multiple views (workout entry, statistics, goals), persistent storage of training data, and visualization components, but doesn't require authentication complexity or server-side processing.

## Essential Features

### Quick Rep Entry
- **Functionality**: Large tap targets for adding reps (+1, +5, +10) plus custom number input
- **Purpose**: Zero-friction logging during workout when hands may be sweaty and focus is on training
- **Trigger**: Primary action on workout screen, always accessible
- **Progression**: Open app → Tap +10 three times for 30 reps → Auto-saves to current set → Visual confirmation
- **Success criteria**: Can log a complete set in under 3 seconds without keyboard

### Set & Session Management
- **Functionality**: Group multiple sets into training sessions, track rest periods, mark set types (regular/drop/max/failure)
- **Purpose**: Understand workout structure and volume patterns over time
- **Trigger**: Automatic new set creation after previous set logged; session auto-starts on first set of day
- **Progression**: Start session → Log set 1 → Rest timer starts → Log set 2 → Mark as drop set → Continue → End session → View summary
- **Success criteria**: Clear visual distinction between sets and sessions; rest time captured automatically or manually

### Variant Selection
- **Functionality**: Choose from preset variants (Regular, Wide, Close, Diamond, Pike, Decline, Archer) or create custom variants
- **Purpose**: Track progression across different push-up styles and identify strengths/weaknesses
- **Trigger**: Selector visible on workout entry screen, remembers last used variant
- **Progression**: Start workout → Select "Diamond" variant → Log sets → View history filtered by variant
- **Success criteria**: Each session can have multiple variants; statistics segregated by variant type

### Date & Time Tracking
- **Functionality**: Automatic timestamp capture for every session and set
- **Purpose**: Enable temporal analysis, streak tracking, and weekly/monthly aggregations
- **Trigger**: Automatic on session start and each set completion
- **Progression**: Background capture → Display in history → Power statistical views
- **Success criteria**: No user input required; accurate to the second for detailed analysis

### Session Notes
- **Functionality**: Free-text notes field per session for technique observations, energy levels, soreness, environment
- **Purpose**: Qualitative data helps explain quantitative anomalies and informs training adjustments
- **Trigger**: Optional field at end of session or accessible during workout
- **Progression**: Complete workout → Add note "Felt strong today, good mind-muscle connection" → Save → Note appears in session history
- **Success criteria**: Notes searchable and displayed in history view; quick voice-to-text support

### Statistics Dashboard
- **Functionality**: Total reps (daily/weekly/monthly), personal records (max single set, max session volume), training streaks, volume trends over time
- **Purpose**: Quantify progress, identify patterns, maintain motivation through visible improvement
- **Trigger**: Dedicated statistics tab/view, always one tap away
- **Progression**: Navigate to stats → View current week volume (523 reps) → Compare to last week (487) → View growth chart → See 12-day streak
- **Success criteria**: Data updates in real-time; charts render instantly; PRs prominently highlighted

### Goal System
- **Functionality**: Set daily/weekly/monthly rep targets; long-term skill goals (e.g., "50 consecutive reps"); progress indicators
- **Purpose**: Provide direction and milestone motivation; gamify the progression
- **Trigger**: Goal management in settings; progress visible on dashboard and during workout
- **Progression**: Set goal "100 reps today" → Log sets → See progress bar fill (73/100) → Complete goal → Celebration animation → New daily streak
- **Success criteria**: Goals persist across sessions; clear visual feedback on progress; celebration on completion

### Data Export
- **Functionality**: Export complete training history as CSV or JSON file
- **Purpose**: Data portability, backup security, analysis in external tools
- **Trigger**: Export button in settings menu
- **Progression**: Settings → Export Data → Choose format (CSV) → Download file → Confirmation
- **Success criteria**: File includes all sessions, sets, timestamps, variants, notes; importable into spreadsheet software

## Edge Case Handling

- **Accidental Tap**: Undo button appears for 3 seconds after any rep addition, allowing instant correction
- **Mid-Workout Exit**: Auto-save all data immediately; session remains "active" for 30 minutes allowing seamless continuation
- **Impossible Numbers**: Warn if single set exceeds 200 reps (likely input error) but allow override
- **Empty Sessions**: If user opens app but logs nothing, no empty session created
- **Deleted Data Recovery**: Soft-delete with 30-day recovery period before permanent removal
- **Variant Conflicts**: If custom variant name matches preset, append "(Custom)" automatically

## Design Direction

The design should feel energetic yet focused—like a serious training tool that respects the user's athletic dedication while providing motivational uplift. Think athletic minimalism: bold numerals, clear data hierarchy, and satisfying interaction feedback that mimics the physical satisfaction of completing a set. Interface should be uncluttered to reduce cognitive load during workout fatigue, with progressive disclosure of advanced features.

## Color Selection

Triadic color scheme anchored in athletic energy—combining warm motivation with cool precision to balance excitement and focus.

- **Primary Color**: `oklch(0.55 0.21 25)` - Energetic orange-red that signals action, strength, and warmth; evokes muscle engagement and determination
- **Secondary Colors**: 
  - `oklch(0.60 0.15 140)` - Fresh athletic green for success states and positive reinforcement
  - `oklch(0.65 0.18 260)` - Cool focused blue for statistical/analytical sections, providing visual rest
- **Accent Color**: `oklch(0.75 0.20 50)` - Vibrant coral for CTAs and progress celebrations, grabs attention without aggression
- **Foreground/Background Pairings**:
  - Background (White `oklch(0.98 0 0)`): Dark foreground `oklch(0.20 0 0)` - Ratio 15.8:1 ✓
  - Card (`oklch(0.97 0.005 80)`): Dark foreground `oklch(0.20 0 0)` - Ratio 14.9:1 ✓
  - Primary (`oklch(0.55 0.21 25)`): White text `oklch(0.99 0 0)` - Ratio 5.2:1 ✓
  - Secondary Green (`oklch(0.60 0.15 140)`): White text `oklch(0.99 0 0)` - Ratio 6.1:1 ✓
  - Accent Coral (`oklch(0.75 0.20 50)`): Dark text `oklch(0.20 0 0)` - Ratio 8.9:1 ✓
  - Muted (`oklch(0.95 0.01 80)`): Muted foreground `oklch(0.50 0.02 20)` - Ratio 7.8:1 ✓

## Font Selection

Typography should convey athletic precision and modern performance—clear, bold numerals for data readability with clean sans-serif personality that feels contemporary and energetic.

- **Primary Typeface**: Inter - Clean geometric sans with excellent numeral design for statistics and rep counts
- **Display Numbers**: Outfit - Slightly geometric, great for large rep counters and bold statistics

**Typographic Hierarchy**:
- H1 (Screen Titles): Inter Bold/32px/tight (-0.02em) tracking
- H2 (Section Headers): Inter SemiBold/24px/tight tracking
- H3 (Card Titles): Inter SemiBold/18px/normal tracking
- Body (Descriptions): Inter Regular/16px/relaxed (1.5) leading
- Large Numbers (Rep Counter): Outfit Bold/72px/tight tracking
- Small Numbers (Stats): Outfit Medium/28px/normal tracking
- Labels: Inter Medium/14px/wide (0.02em) tracking/uppercase
- Caption: Inter Regular/13px/normal tracking/muted color

## Animations

Animations should provide satisfying feedback that mirrors the physical accomplishment of completing reps—quick, punchy, and energetic without delaying functionality. Motion communicates progress and success, reinforcing the dopamine loop.

**Purposeful Meaning**: Celebrate achievements with brief elastic bounces; use smooth slides for navigation to maintain spatial orientation; quick scale transforms on button presses to provide tactile-like feedback

**Hierarchy of Movement**: 
- Critical: Rep addition confirmation (scale + haptic feel)
- Important: Goal completion celebrations (confetti + bounce)
- Supporting: View transitions (slide), hover states (subtle lift)
- Minimal: Data updates (smooth number counting)

## Component Selection

**Components**:
- **Card**: Primary container for statistics, session history entries, and goal cards with subtle shadows for depth
- **Button**: Large primary buttons for rep addition (+1, +5, +10), secondary for session controls; icon-only for auxiliary actions
- **Tabs**: Main navigation between Workout, History, Statistics, Goals, Settings
- **Select**: Variant chooser (dropdown with search for custom variants)
- **Dialog**: Goal creation, session notes, settings configuration
- **Progress**: Linear progress bars for goal completion, circular progress for daily streaks
- **Badge**: Variant tags, set type indicators (Max, Drop, Failure)
- **Separator**: Visual grouping between sets and sessions
- **Calendar**: Date selection for viewing historical data
- **Popover**: Quick actions menu (edit, delete, duplicate)
- **Toast**: Lightweight confirmations for saves, exports, achievements

**Customizations**:
- Custom large numeric input component with +/- steppers for precise rep entry
- Custom rest timer with pause/resume controls and vibration alerts
- Custom chart components using D3 for volume trends (bar charts) and progression (line graphs)
- Custom session summary card with collapsible set details

**States**:
- Buttons: Active workout buttons use accent color with prominent press states; disabled states when no active session
- Inputs: Focus state uses primary color ring; error state for invalid inputs
- Cards: Hover lift on interactive cards; pressed state with subtle scale
- Progress: Animated fill transitions with easing; milestone color changes

**Icon Selection**:
- Plus (rep addition)
- ClockCountdown (rest timer)
- ChartLine (statistics)
- Target (goals)
- ListChecks (session sets)
- Note (session notes)
- Calendar (history)
- DownloadSimple (export)
- Gear (settings)
- Trophy (achievements)
- Fire (streak indicator)

**Spacing**:
- Screen padding: px-6 py-8
- Card internal padding: p-6
- Stack spacing (vertical): gap-4 (standard), gap-6 (sections)
- Inline spacing (horizontal): gap-3 (related), gap-6 (separate groups)
- Button padding: px-8 py-4 (large CTA), px-4 py-2 (secondary)

**Mobile**:
- Bottom tab navigation for primary views on mobile (<768px)
- Stacked statistics cards on mobile (single column)
- Larger touch targets on mobile (minimum 48px)
- Full-width CTAs on mobile screens
- Collapsible session details with accordion pattern
- Sheet component for settings/notes on mobile (slides up from bottom)
