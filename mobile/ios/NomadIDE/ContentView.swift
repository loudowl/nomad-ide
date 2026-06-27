import SwiftUI

struct ContentView: View {
    @State private var snapshots: [Snapshot] = []
    
    var body: some View {
        NavigationView {
            List(snapshots) { snapshot in
                NavigationLink(destination: SnapshotDetailView(snapshot: snapshot)) {
                    Text("Snapshot \(snapshot.id)")
                }
            }
            .navigationTitle("Snapshots")
            .onAppear {
                fetchSnapshots()
            }
        }
    }
    
    func fetchSnapshots() {
        // Fetch snapshots from the backend
        // This is a placeholder for network call
        snapshots = [Snapshot(id: 1), Snapshot(id: 2)]
    }
}

struct Snapshot: Identifiable {
    let id: Int
}

struct SnapshotDetailView: View {
    let snapshot: Snapshot
    
    var body: some View {
        Text("Detail for Snapshot \(snapshot.id)")
    }
}

@main
struct NomadIDEApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
