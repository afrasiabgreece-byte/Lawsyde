// Debug environment variables first
console.log('Environment check:');
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY);
console.log('All env vars:', import.meta.env);

// Simple test without Supabase first
document.querySelector('#app').innerHTML = `
  <div>
    <h1>Environment Debug</h1>
    <p>VITE_SUPABASE_URL: ${import.meta.env.VITE_SUPABASE_URL || 'UNDEFINED'}</p>
    <p>VITE_SUPABASE_ANON_KEY: ${import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'UNDEFINED'}</p>
    <button id="test-supabase">Test Supabase Connection</button>
    <div id="result"></div>
  </div>
`;

document.getElementById('test-supabase').addEventListener('click', async () => {
  const resultDiv = document.getElementById('result');
  
  try {
    // Import Supabase only when needed
    const { supabase } = await import('./lib/supabase.js');
    resultDiv.innerHTML = '<p style="color: green;">✅ Supabase client created successfully!</p>';
    
    // Test a simple query
    const { data, error } = await supabase.from('lawyers').select('count');
    if (error) {
      resultDiv.innerHTML = `<p style="color: orange;">⚠️ Client created but query failed: ${error.message}</p>`;
    } else {
      resultDiv.innerHTML = '<p style="color: green;">✅ Supabase connection working!</p>';
    }
  } catch (error) {
    resultDiv.innerHTML = `<p style="color: red;">❌ Error: ${error.message}</p>`;
    console.error('Supabase error:', error);
  }
});