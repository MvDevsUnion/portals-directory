export const Footer = () => {
  return (
    <footer className="border-t py-6 border-zinc-900 text-center text-sm text-muted-foreground">
      <p className="flex items-center justify-center gap-1">
        <span className="text-zinc-500">Powered by</span>
        <a
          href="https://mvdevsunion.github.io/devs-homepage/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
        >
          MvDevsUnion
        </a>
      </p>
    </footer>
  );
};
