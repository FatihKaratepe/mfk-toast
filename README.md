# mfk-toast

A lightweight and elegant Vue 3 toast notification library with TypeScript support, multiple animations, and flexible positioning.

[![npm version](https://img.shields.io/npm/v/mfk-toast.svg)](https://www.npmjs.com/package/mfk-toast)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **6 Position Options**: top-left, top-right, top-center, bottom-left, bottom-right, bottom-center
- 🎭 **4 Animation Types**: bounce, zoom, slide, fade
- 🎯 **Type-Safe**: Built with TypeScript for enhanced developer experience
- 📱 **Responsive**: Works seamlessly across all screen sizes
- 🔄 **Vue 3 Composition API**: Modern Vue patterns with `<script setup>`
- 🧪 **Fully Tested**: Comprehensive test coverage
- 🎨 **Customizable**: Control colors, duration, icons, and more
- 🌙 **Dark Mode Ready**: Easily customizable for dark themes

## 📦 Installation

```bash
npm install mfk-toast
```

or with yarn:

```bash
yarn add mfk-toast
```

or with pnpm:

```bash
pnpm add mfk-toast
```

## 🚀 Quick Start

### 1. Import the CSS

Import the CSS file in your main entry file (e.g., `main.ts` or `App.vue`):

```typescript
import "mfk-toast/style.css";
```

### 2. Use the Toast

#### Option A: Composition API (Recommended)

```vue
<script setup lang="ts">
import { useToast } from "mfk-toast";

const toast = useToast();

function showSuccess() {
  toast.success("Success!", "Your changes have been saved.");
}
</script>
```

#### Option B: As a Vue Plugin

```typescript
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import MfkToast from "mfk-toast";
import "mfk-toast/style.css";

const app = createApp(App);
app.use(MfkToast);
app.mount("#app");
```

Then use it in your components:

```vue
<script setup lang="ts">
import { getCurrentInstance } from "vue";

const instance = getCurrentInstance();
const toast = instance?.appContext.config.globalProperties.$mfkToast;

function showToast() {
  toast?.({
    title: "Hello!",
    message: "Welcome to mfk-toast",
  });
}
</script>
```

## 📖 API Reference

### useToast() Hook

The `useToast` composable is the primary way to interact with the toast notification system. It's a Vue 3 Composition API hook that provides all the methods needed to create and manage toast notifications.

#### How it Works

The `useToast` hook can be called from anywhere in your Vue components. It doesn't require any setup or configuration - just import and use it:

```vue
<script setup lang="ts">
import { useToast } from "mfk-toast";

const toast = useToast();

// Now you can use toast.success(), toast.error(), etc.
</script>
```

#### Why Use useToast?

- ✅ **No additional setup required** - Works out of the box
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Composable** - Use it in any component, composable, or function
- ✅ **Clean API** - Simple, intuitive method names
- ✅ **Flexible** - Use convenience methods or full customization

#### Return Value

The `useToast()` hook returns an object with the following methods:

#### Methods

##### `toast.success(title, message, options?)`

Show a success notification.

```typescript
toast.success("Success!", "Your changes have been saved.");
```

##### `toast.error(title, message, options?)`

Show an error notification.

```typescript
toast.error("Error!", "Something went wrong.");
```

##### `toast.warning(title, message, options?)`

Show a warning notification.

```typescript
toast.warning("Warning!", "Please check your input.");
```

##### `toast.info(title, message, options?)`

Show an info notification.

```typescript
toast.info("Info", "Here is some information.");
```

##### `toast.open(options)`

Show a notification with full customization.

```typescript
toast.open({
  title: "Custom Toast",
  message: "This is fully customizable",
  type: "info",
  position: "top-right",
  duration: 3000,
  animation: "bounce",
  showProgressBar: true,
  pauseOnHover: true,
  backgroundColor: "#4CAF50",
  textColor: "#FFFFFF",
});
```

##### `toast.clear()`

Clear all active notifications.

```typescript
toast.clear();
```

## ⚙️ Configuration Options

| Option             | Type                                                                                              | Default       | Description                               |
| ------------------ | ------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------- |
| `title`            | `string`                                                                                          | **required**  | Toast title                               |
| `message`          | `string`                                                                                          | **required**  | Toast message                             |
| `type`             | `'success' \| 'error' \| 'warning' \| 'info'`                                                     | `'info'`      | Notification type                         |
| `position`         | `'top-left' \| 'top-right' \| 'top-center' \| 'bottom-left' \| 'bottom-right' \| 'bottom-center'` | `'top-right'` | Position on screen                        |
| `duration`         | `number`                                                                                          | `3000`        | Display duration in ms (0 for persistent) |
| `animation`        | `'bounce' \| 'zoom' \| 'slide' \| 'fade'`                                                         | `'bounce'`    | Animation type                            |
| `showIcon`         | `boolean`                                                                                         | `true`        | Show type icon                            |
| `customIcon`       | `string`                                                                                          | `''`          | Custom icon URL or emoji                  |
| `showCloseButton`  | `boolean`                                                                                         | `true`        | Show close button                         |
| `showProgressBar`  | `boolean`                                                                                         | `true`        | Show progress bar                         |
| `pauseOnHover`     | `boolean`                                                                                         | `true`        | Pause timer on hover (desktop only)       |
| `backgroundColor`  | `string`                                                                                          | `''`          | Custom background color (hex or named)    |
| `textColor`        | `string`                                                                                          | `''`          | Custom text color (hex or named)          |
| `progressBarColor` | `string`                                                                                          | `''`          | Custom progress bar color (hex or named)  |
| `container`        | `string`                                                                                          | `''`          | CSS selector for custom mount point       |

---

## 🎯 ToastContainer Component

The `ToastContainer` component is an **optional** component that helps manage toast notifications within a specific container in your application.

### When to Use ToastContainer?

By default, toast notifications are mounted to `document.body` and appear globally. However, you might want to use `ToastContainer` in these scenarios:

1. **Scoped notifications** - Limit toasts to a specific section of your app
2. **Multiple toast areas** - Have different toast containers in different parts of your UI
3. **Modal/Dialog toasts** - Show toasts inside modals or dialogs
4. **Layout control** - Better control over where toasts appear in your layout

### Basic Usage

```vue
<template>
  <div id="app">
    <YourContent />

    <!-- Toast notifications will be mounted here -->
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { ToastContainer } from "mfk-toast";
</script>
```

### How It Works

When you add `<ToastContainer />` to your template, it creates a mount point for toast notifications. The toast system will automatically detect and use this container.

**Important Notes:**

- ✅ Only one `ToastContainer` should be active at a time
- ✅ If you don't use `ToastContainer`, toasts will mount to `document.body` (which is fine for most cases)
- ✅ The container is just a `<div>` with no visual styling - it's purely for mounting toasts

### Advanced: Using Custom Container with CSS Selector

You can also target a specific container using the `container` option:

```vue
<template>
  <div id="my-custom-container"></div>
</template>

<script setup lang="ts">
import { useToast } from "mfk-toast";

const toast = useToast();

toast.success("Hello", "This will appear in #my-custom-container", {
  container: "#my-custom-container",
});
</script>
```

### Example: Scoped Toasts in a Modal

```vue
<template>
  <div class="modal">
    <h2>User Settings</h2>

    <!-- Toasts will appear inside this modal -->
    <ToastContainer />

    <button @click="saveSettings">Save Settings</button>
  </div>
</template>

<script setup lang="ts">
import { ToastContainer, useToast } from "mfk-toast";

const toast = useToast();

function saveSettings() {
  // This toast will appear inside the modal
  toast.success("Saved!", "Your settings have been updated.");
}
</script>
```

---

## 💡 Usage Examples

### Basic Notifications

```typescript
import { useToast } from "mfk-toast";

const toast = useToast();

// Simple success
toast.success("Done!", "Operation completed successfully.");

// Simple error
toast.error("Oops!", "Failed to save changes.");

// Simple warning
toast.warning("Attention!", "This action cannot be undone.");

// Simple info
toast.info("Note", "New features are available.");
```

### Custom Styling

```typescript
toast.open({
  title: "Custom Colors",
  message: "This toast has custom colors!",
  type: "success",
  backgroundColor: "#6366F1",
  textColor: "#FFFFFF",
  progressBarColor: "#FCD34D",
});
```

### Different Positions

```typescript
// Top positions
toast.info("Top Left", "Message", { position: "top-left" });
toast.info("Top Center", "Message", { position: "top-center" });
toast.info("Top Right", "Message", { position: "top-right" });

// Bottom positions
toast.info("Bottom Left", "Message", { position: "bottom-left" });
toast.info("Bottom Center", "Message", { position: "bottom-center" });
toast.info("Bottom Right", "Message", { position: "bottom-right" });
```

### Different Animations

```typescript
toast.success("Bounce", "Bouncy animation", { animation: "bounce" });
toast.success("Zoom", "Zoom animation", { animation: "zoom" });
toast.success("Slide", "Slide animation", { animation: "slide" });
toast.success("Fade", "Fade animation", { animation: "fade" });
```

### Persistent Toast

```typescript
// Set duration to 0 for a toast that doesn't auto-dismiss
toast.open({
  title: "Important!",
  message: "This toast will stay until manually closed.",
  duration: 0,
  type: "warning",
});
```

### Custom Mount Point

```typescript
// Mount toast to a specific container
toast.open({
  title: "Custom Container",
  message: "This toast is mounted to a specific element.",
  container: "#my-toast-container",
});
```

### Custom Icons

```typescript
// Use emoji as custom icon
toast.open({
  title: 'Party Time!',
  message: 'Let's celebrate!',
  customIcon: '🎉',
  type: 'success',
});

// Use image URL as custom icon
toast.open({
  title: 'New Message',
  message: 'You have a new message.',
  customIcon: 'https://example.com/icon.png',
  type: 'info',
});
```

## 🎨 TypeScript Support

This library is written in TypeScript and provides full type definitions.

```typescript
import { useToast, type NotificationOptions } from "mfk-toast";

const toast = useToast();

const options: NotificationOptions = {
  title: "TypeScript",
  message: "Full type support!",
  type: "success",
  duration: 5000,
};

toast.open(options);
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [Fatih Karatepe](https://github.com/FatihKaratepe)

## 🔗 Links

- [GitHub Repository](https://github.com/FatihKaratepe/mfk-toast)
- [Report Issues](https://github.com/FatihKaratepe/mfk-toast/issues)
- [NPM Package](https://www.npmjs.com/package/mfk-toast)

---

**Made with ❤️ using Vue 3 + TypeScript**
