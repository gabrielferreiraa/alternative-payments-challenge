# Rick and Morty Character Dashboard

A technical assessment project for Alternative Payments. This application displays a dashboard of Rick and Morty characters with search functionality, infinite scrolling, and location statistics.

## 🚀 Setup and Run Instructions

### Prerequisites

- **Node.js**: v24 (Strictly enforced)
- **Package Manager**: pnpm

### Installation

1. **Ensure correct Node version:**

   ```bash
   nvm use 24
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Generate GraphQL types:**
   This project uses GraphQL Code Generator to ensure type safety.

   ```bash
   pnpm codegen
   ```

4. **Run the development server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

### Running Tests

To run the unit tests using Vitest:

```bash
pnpm test
```

## 🏗 Component Structure & Design Decisions

This project strictly follows **Atomic Design Principles** to ensure scalability, reusability, and clear separation of concerns.

### Project Structure

- **`components/ui`**: Base UI primitives (buttons, badges, inputs). These are the foundational "Design System Atoms".
- **`components/atoms`**: Domain-specific building blocks (e.g., `InfiniteScrollTrigger`, `LoadMoreCharactersLoader`).
- **`components/molecules`**: Combinations of atoms (e.g., `SearchInput`, `CharacterStatusBadge`). They provide specific UI functionality.
- **`components/organisms`**: Complex, standalone sections (e.g., `CharacterTable`, `CharacterLocationChart`). These manage data presentation and user interaction.
- **`components/templates`**: Page layouts that place organisms (e.g., `CharacterDashboard`).
- **`lib/`**: Utilities, GraphQL clients, and fetchers.
- **`hooks/`**: Custom React hooks (e.g., `useInfiniteCharacters`) to separate logic from view.

### Key Design Decisions

1. **GraphQL & Codegen**:
   - Used `graphql-request` for a lightweight client.
   - Implemented `graphql-codegen` to automatically generate TypeScript types from queries. This guarantees that UI components are perfectly synced with the API schema, eliminating "any" types and runtime errors related to data structure.

2. **TanStack Query (React Query)**:
   - Chosen for robust server-state management.
   - Handles caching, loading states, and critically, simplifies the **Infinite Scroll** implementation via `useInfiniteQuery`.

3. **Tailwind CSS v4**:
   - Used for rapid, utility-first styling.
   - Configuration is minimal and modern (v4).

4. **Testing Strategy**:
   - **Vitest** + **React Testing Library** for fast, DOM-aware unit tests.
   - Focus on testing component interactions and hook logic.

### 🚀 Future Improvements & Roadmap

- **Virtualization (TanStack Virtual)**: Implemented virtualized lists to handle large datasets efficiently, ensuring high performance even with thousands of characters.
- **Server Actions for Initial Load**: Utilize Server Actions to pre-fetch initial character data, eliminating the client-side loading state for the first page.
- **Advanced Filtering**: Add filters for Species, Status, and Gender.
- **Expanded Testing**: Write more tests. Currently, only key components and business logic are 
tested.
- **CI/CD & Quality Assurance**: Configure automated quality assurance checks (linting, testing, etc.) on Pull Requests.
