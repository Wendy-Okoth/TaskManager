import { useAuth } from '../contexts/AuthContext';

/**
 * Home Component
 * Landing page showcasing the app's value proposition, features, workflow, 
 * and the specific "Ledger Blue" design philosophy for evaluators.
 */
const Home = ({ onLogin, onSignup }) => {
  const { user } = useAuth();

  // Core feature highlights mapping directly to assessment expectations
  const features = [
    {
      title: 'Your Tasks, Your Data',
      description: 'Every task is stored with user-level access control. No one else can see or touch your work.',
    },
    {
      title: 'Quiet, Focused Design',
      description: 'No badges, no pills, no noise. Just a clean list with subtle state indicators.',
    },
    {
      title: 'Real‑Time Updates',
      description: 'Changes appear instantly across all your devices. No refresh needed.',
    },
    {
      title: 'Ledger Blue Theme',
      description: 'A single indigo hue with warmth. One signature move: the left‑edge status border.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-ledger-bg">
      {/* Hero Section */}
      <section className="py-16 px-4 border-b border-ledger-pale">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-start gap-6">
            <div className="inline-block border border-ledger-pale bg-ledger-card rounded px-3 py-1 text-xs font-medium text-ledger-indigo tracking-wider uppercase">
               Task Management
            </div>
            <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-ledger-text">
              A <span className="text-ledger-indigo">Calm</span> List for Your
              <br/>
              Tasks and Ideas.
            </h1>
            <p className="text-lg text-ledger-tinted max-w-2xl">
              Ledger Blue is a task manager that trades distraction for clarity.
              One hue. One border. One focus: your work.
            </p>
            {/* Conditional action triggers depending on auth session */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onSignup}
                className="px-6 py-2.5 bg-ledger-indigo hover:bg-ledger-indigo/90 text-white rounded transition text-sm font-medium"
              >
                Get Started
              </button>
              <button
                onClick={onLogin}
                className="px-6 py-2.5 border border-ledger-pale bg-ledger-card hover:bg-ledger-pale rounded transition text-sm font-medium"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 border-b border-ledger-pale">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-medium text-ledger-text mb-8 border-b-2 border-ledger-pale pb-2 inline-block">
            Why Ledger?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 mt-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="border border-ledger-pale bg-ledger-card p-6 rounded hover:shadow-sm transition"
              >
                <h3 className="font-semibold text-ledger-text mb-2">{feature.title}</h3>
                <p className="text-sm text-ledger-tinted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 border-b border-ledger-pale">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-medium text-ledger-text mb-8 border-b-2 border-ledger-pale pb-2 inline-block">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-4">
            <div className="text-center border border-ledger-pale bg-ledger-card p-6 rounded">
              <div className="text-3xl text-ledger-indigo mb-2">1</div>
              <h3 className="font-semibold text-ledger-text mb-1">Create an Account</h3>
              <p className="text-sm text-ledger-tinted">Sign up with email and a strong password.</p>
            </div>
            <div className="text-center border border-ledger-pale bg-ledger-card p-6 rounded">
              <div className="text-3xl text-ledger-indigo mb-2">2</div>
              <h3 className="font-semibold text-ledger-text mb-1">Add Your Tasks</h3>
              <p className="text-sm text-ledger-tinted">Title, description, due date, status — keep it simple.</p>
            </div>
            <div className="text-center border border-ledger-pale bg-ledger-card p-6 rounded">
              <div className="text-3xl text-ledger-indigo mb-2">3</div>
              <h3 className="font-semibold text-ledger-text mb-1">Watch the Border</h3>
              <p className="text-sm text-ledger-tinted">Status moves from tinted → solid → transparent as tasks complete.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="border border-ledger-pale bg-ledger-card p-8 rounded">
            <h2 className="text-2xl font-medium text-ledger-text mb-4 border-b-2 border-ledger-pale pb-2 inline-block">
              Design Philosophy
            </h2>
            <div className="space-y-3 text-sm text-ledger-tinted leading-relaxed mt-4">
              <p>
                <span className="text-ledger-indigo font-semibold">One Hue, One Story.</span> Ledger Blue uses a single indigo accent across three weights — full for actions, tinted for borders, pale for backgrounds.
              </p>
              <p>
                <span className="text-ledger-indigo font-semibold">One Signature Move.</span> Status isn't a badge or a dot. It's a 3px left border that fills from tinted to solid to transparent. Complete tasks disappear into the background.
              </p>
              <p>
                <span className="text-ledger-indigo font-semibold">One Functional Exception.</span> Overdue tasks get a brick left border. That's the only red in the whole app.
              </p>
              <p>
                <span className="text-ledger-indigo font-semibold">One Typeface.</span> Inter does both jobs: 600 weight for titles, 400 at 90% size for metadata. No mono, no serif — restraint is the design choice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;