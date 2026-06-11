export default function LoadingSpinner() {

  return (

    <div className="min-h-screen flex justify-center items-center">

      <div className="text-center">

        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto"></div>

        <p className="mt-4 text-xl font-semibold">
          Loading...
        </p>

      </div>

    </div>

  );
}