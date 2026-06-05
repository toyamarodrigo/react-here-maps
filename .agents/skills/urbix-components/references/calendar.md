# Calendar

Date-picker calendar built on `react-day-picker` with Urbix tokens, Spanish locale by default, and an optional month-navigation animation. Accepts every `DayPicker` prop plus a few Urbix extensions.

## Status

- Scope: Public Component
- Lifecycle: not declared

## Imports

```tsx
import { Calendar } from "@urbetrack/urbix";
```

There is no exported `Forms.DatePicker` wrapper. Compose `Calendar` with `Popover` and your app's form layer when a date-picker trigger is needed.

## Usage

```tsx
const [date, setDate] = useState<Date | undefined>(undefined);

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>;
```

Range selection:

```tsx
<Calendar
  mode="range"
  selected={range}
  onSelect={setRange}
  numberOfMonths={2}
/>
```

## API

`Calendar` accepts every prop from `react-day-picker`'s `DayPicker` (`mode`, `selected`, `onSelect`, `month`, `defaultMonth`, `numberOfMonths`, `disabled`, `fromDate`, `toDate`, `weekStartsOn`, etc.). Urbix-specific additions:

| Prop | Type | Default |
|---|---|---|
| `buttonVariant` | `Button["variant"]` | `"link"` |
| `disableFutureDates` | `boolean` | `false` (when `true`, disables `{ after: new Date() }` and merges with any existing `disabled`) |
| `animateMonthNavigation` | `boolean` | `false` (slides months left/right when prev/next is clicked; force-stables to a six-week grid) |
| `locale` | `Locale` (from `date-fns/locale`) | `es` |
| `captionLayout` | DayPicker prop | `"label"` |
| `showOutsideDays` | DayPicker prop | `true` |

The component re-styles every DayPicker slot via `classNames` and overrides `Root`, `Chevron`, `DayButton`, `WeekNumber` components to use Urbix `Button` and tokenized chevron icons. Pass `classNames` / `components` to merge over the defaults.

### Exports

```ts
export { Calendar, CalendarDayButton };
```

`CalendarDayButton` is exported for cases where consumers compose their own `DayPicker` with Urbix day styling.

## Patterns

### Disable future dates

```tsx
<Calendar mode="single" disableFutureDates selected={date} onSelect={setDate} />
```

### Two-month range

```tsx
<Calendar
  mode="range"
  numberOfMonths={2}
  animateMonthNavigation
  selected={range}
  onSelect={setRange}
/>
```

When `animateMonthNavigation` is on, `fixedWeeks` defaults to `true` so the calendar height does not jump between months.

### English locale

```tsx
import { enUS } from "date-fns/locale";

<Calendar mode="single" locale={enUS} selected={date} onSelect={setDate} />;
```

### Inside a popover

Compose `Calendar` with `Popover` for the trigger and panel; `Calendar` itself is purely the grid.

## Mistakes

- **Passing `disabled={[...]}` together with `disableFutureDates` and assuming it overrides.** They merge — future dates remain disabled.
- **Expecting a fixed 6-week grid by default.** Only when `animateMonthNavigation` is enabled. Otherwise DayPicker's natural row count applies.
- **Hard-coding English UI strings.** Default `locale` is Spanish (`es`); month captions are capitalized and rendered in Spanish unless `locale` is overridden.

## Related references

- [popover.md](./popover.md) — common host when wiring up a custom date picker.

## Source files

- `packages/urbix/src/ui/molecules/calendar/calendar.tsx`
