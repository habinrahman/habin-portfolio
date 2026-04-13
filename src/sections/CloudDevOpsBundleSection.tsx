import CloudInfrastructureSection from './CloudInfrastructureSection'
import DevOpsDeploymentSection from './DevOpsDeploymentSection'

/** One chapter: cloud footprint → how it ships and runs (less section fatigue than two bands). */
export default function CloudDevOpsBundleSection() {
  return (
    <section
      id="cloud-devops"
      aria-label="Cloud infrastructure and DevOps deployment"
      className="scroll-mt-4 border-t border-slate-200/60 bg-white px-4 py-10 md:px-8 md:py-12"
    >
      <CloudInfrastructureSection bundle />
      <div className="mx-auto my-8 max-w-5xl border-t border-slate-200/80 md:my-10" aria-hidden />
      <DevOpsDeploymentSection bundle />
    </section>
  )
}
