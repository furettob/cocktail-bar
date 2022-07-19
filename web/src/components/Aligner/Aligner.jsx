function Aligner({children, allineamento}) {

  const classe = 'cb-aligner cb-aligner-' + allineamento;

  return <div className={classe}>
    {children}
  </div>
}

export default Aligner;
