import Header from '@/components/Header';

export const metadata = {
  title: 'AI-SOC Instructions - Silence AI',
};

export default function Page() {
  return (
    <main className="relative flex min-h-screen flex-col items-center p-1 pt-8 md:pt-16">
      <div className="w-full max-w-7xl mx-auto">
        <Header />
      </div>
    </main>
  );
}
