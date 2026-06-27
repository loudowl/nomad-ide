package com.nomadide

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.nomadide.ui.theme.NomadIDETheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            NomadIDETheme {
                Scaffold(
                    topBar = {
                        TopAppBar(
                            title = { Text("Snapshots") }
                        )
                    },
                    content = {
                        SnapshotList()
                    }
                )
            }
        }
    }
}

@Composable
fun SnapshotList() {
    val snapshots = remember { mutableStateListOf(1, 2, 3) }
    LazyColumn(
        modifier = Modifier.fillMaxSize().padding(16.dp)
    ) {
        items(snapshots.size) { index ->
            Text("Snapshot ${snapshots[index]}", style = MaterialTheme.typography.h6)
            Divider()
        }
    }
}
