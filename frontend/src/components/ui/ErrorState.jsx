export default function ErrorState({ message = 'Something went wrong.' }) {
    return (
        <div className="flex items-center justify-center py-20">
            <p className="font-mono text-xs text-muted tracking-widest uppercase">
                {message}
            </p>
        </div>
    );
}