export default function Spinner ({ fullscreen = false }) {
    const ring = (
        <div className="w-7 h-7 border-2 border-border border-t-accent rounded-full animate-spin" />
    );
    if (fullscreen) {
        return <div className="min-h-screen flex items-center justify-center bg-paper">{ring}</div>;
    }
    return <div className="flex items-center justify-center py-20">{ring}</div>;
}