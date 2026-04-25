# Cypher Scholar Design System

## 1. Vision & Mood
- **Vision**: An Indian exam prep platform that feels like a motivating companion, not a chore.
- **Mood**: Vibrant, Light, Energetic, Warm, Motivating.
- **Inspiration**: Duolingo, Instagram.
- **Rules**: NO DARK MODE. Use white space and soft shadows.

## 2. Color Palette
### Gradients
- **Primary Gradient**: `linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%)` (Indigo-Purple-Pink)
- **Secondary Gradient**: `linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)` (Cyan-Blue)
- **Surface Gradient**: `linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)`

### Subject Colors (Ownable Identities)
- **Physics**: `#3B82F6` (Electric Blue) - Precision and clarity.
- **Chemistry**: `#10B981` (Emerald) - Reaction and life.
- **Mathematics**: `#8B5CF6` (Violet) - Logic and abstraction.
- **Biology**: `#F97316` (Orange) - Vitality and nature.
- **English**: `#EC4899` (Hot Pink) - Expression and creativity.

### Semantic Colors
- **Success**: `#22C55E`
- **Warning**: `#F59E0B`
- **Error**: `#EF4444`
- **Info**: `#3B82F6`

## 3. Typography
- **Display Font**: `Outfit` (Headings) - Bold, geometric, friendly.
- **UI Font**: `Inter` (Body, Labels) - Exceptionally readable on all screens.

### Type Scale
- **xs**: 0.75rem (12px) - Microcopy, captions
- **sm**: 0.875rem (14px) - Secondary text, labels
- **base**: 1rem (16px) - Standard body text
- **lg**: 1.125rem (18px) - Emphasis body
- **xl**: 1.25rem (20px) - Sub-headlines
- **2xl**: 1.5rem (24px) - Section headers
- **3xl**: 1.875rem (30px) - Page titles
- **4xl**: 2.25rem (36px) - Mega headlines

### Weights
- **Normal**: 400
- **Medium**: 500
- **Semi-Bold**: 600
- **Bold**: 700

## 4. Component Tokens
- **Border Radius**:
    - `rounded-md`: 12px (Small components)
    - `rounded-lg`: 20px (Cards, Modals)
    - `rounded-xl`: 32px (Feature sections, Large banners)
    - `rounded-full`: 9999px (Buttons, Avatars)
- **Shadow Scale**:
    - `shadow-sm`: `0 4px 6px -1px rgba(0, 0, 0, 0.05)`
    - `shadow-card`: `0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.03)`
    - `shadow-float`: `0 20px 50px -12px rgba(99, 102, 241, 0.15)`
- **Animation Durations**:
    - `fast`: 150ms (UI feedback, hovers)
    - `medium`: 300ms (Page transitions, dropdowns)
    - `slow`: 600ms (Rewards, celebrations)

## 5. Motion Principles (Framer Motion)
1. **Entrance**: Staggered container with children using `opacity: 0, y: 20` to `opacity: 1, y: 0`.
2. **Interactions**: Button taps use `scale: 0.96`. Hover states use `y: -4` and increased shadow.
3. **Rewards**: Success state triggers a `scale: [1, 1.2, 1]` with a rotation bounce.
4. **Progress Bars**: Ease: `[0.23, 1, 0.32, 1]` (Material-like rapid start, smooth finish).

## 6. Component Library
- **Buttons**: `Primary (Gradient)`, `Secondary (Soft Tint)`, `Ghost`, `Icon`.
- **Inputs**: High-contrast light backgrounds, colorful focus rings.
- **Cards**: 
    - Subject Card: Icon + Color Accent + Progress Ring.
    - Exam Card: Countdown + Topic Tags + Enroll Button.
- **Navigation**: Persistent bottom bar for mobile, top bar with avatar for desktop.
- **Rewards**: Streak counter with flame animation.
- **Loaders**: Pulsing skeleton cards with soft gradient.
